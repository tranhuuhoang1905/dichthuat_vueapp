<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Models\Words;
use App\Models\TranslationWord;
use App\Models\LogImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
// export file excel
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;
use App\Exports\DataExport;
use Illuminate\Support\Collection;
// export file excel
use Validator;

class WordsController extends Controller
{
    // all words không hiện từ bị ẩn
    public function index()
    {
        $words = Words::all()->where('status', '>', 0)->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The new word successfully added',
            'data'=> [
                'words'=>$words
            ]
        ];
        return response()->json($responseData);
    }
    
    // all words có các từ bị ẩn
    public function allWord()
    {
        $wordsTest = DB::table('words')
            ->select('words.id as word_id','words.word as word','words.description as description','words.language_id as language_id', 'words.status as status',
                    DB::raw('GROUP_CONCAT(CONCAT("{\"language_id\":", translation_word.language_id, ",\"translate\":\"", translation_word.translate, "\"}") SEPARATOR ",") as data'))
            ->join('translation_word', 'words.id', '=', 'translation_word.word_id')
            ->groupBy('words.id', 'words.status') // Bao gồm tất cả các cột trong GROUP BY
            ->distinct('words.id', 'words.status', 'translation_word.language_id') // Bao gồm tất cả các cột trong DISTINCT
            ->limit(10)
            ->get();
        $words = Words::all()->toArray();
        $languages = Languages::all()->where('status', '>', 0)->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The new word successfully added',
            'data'=> [
                'words'=>$words,
                'words_test'=>$wordsTest,
                'languages'=>$languages
            ]
        ];
        return response()->json($responseData);
    }
    // add word
    public function add(Request $request)
    {
        // $languageId = $request->input('language_id');
        $languageId = 1;
        $languageTranslateId = $request->input('language_translate_id');
        $word = $request->input('word');
        $translate = $request->input('translate');
        $description = $request->input('description');
        $translateDescription = $request->input('translate_description');
        $words = new Words();
        $check = $words->saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription,0);
        // lưu phiên bảng tiếng việt
        $words->saveWithTranslation($languageId, $languageId, $word, $word, $description, $description,0);
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The new word successfully added',"data"=>$check];
        return response()->json($responseData);
    }
    public function suggestions(Request $request)
    {
        $languageId = 1;
        $keyword = $request->input('keyword');
        $words = DB::table('words')
            ->select('id', 'word','description') // Chỉ định các cột cần lấy
            ->where('word', 'like', '%'.$keyword.'%')
            ->where('language_id', $languageId)
            ->orderByRaw('LENGTH(word)')
            ->take(20)
            ->get(); // Thực hiện truy vấn và lấy tất cả các dòng kết quả

        // Chuyển đổi kết quả thành mảng
        $wordsArray = $words->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The new word successfully added',
            'data'=>['words'=>$wordsArray]
        ];
        return response()->json($responseData);
    }
    

    // edit word
    public function alldata($id)
    {
        $word = Words::join('languages', 'words.language_id', '=', 'languages.id')
             ->select('words.*', 'languages.name as language')
             ->where('words.id', $id)
             ->first();
        if(!$word){
            $responseData = [
                'status' => 200,
                'success'=>true,
                'message' => 'success',
                'data' => []
            ];
            return response()->json($responseData);
        }
        $Translates = TranslationWord::join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->select('languages.name as language', 'translation_word.*')
            ->where('translation_word.word_id', $word->id)
            ->get()
            ->toArray();
        // $dataRep = [
        //     'word_info' =>$word,
        //     'translates' => $TranslationWords 
        // ];
        $languages = Languages::all()->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'success',
            'data' => [
                'languages'=>$languages,
                'translates' => $Translates,
                'wordDefault' => $word
            ]
        ];
        return response()->json($responseData);
    }
    
 
    // edit word
    public function edit($id)
    {
        $word = Words::join('languages', 'words.language_id', '=', 'languages.id')
             ->select('words.*', 'languages.name as language')
             ->where('words.id', $id)
             ->first();

        $languages = Languages::all()->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'success',
            'data'=>[
                'word'=>$word,
                'languages'=>$languages
            ]
        ];
        return response()->json($responseData);
    }
 
    // update language
    public function update($id, Request $request)
    {
        $word = Words::find($id);
        $word->update($request->all());
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The word successfully updated'];
        return response()->json($responseData);
        
    }
 
    

    public function importWordsFromExcel(Request $request)
    {
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        if (!$file->isValid() || $file->getClientOriginalExtension() != 'xlsx' && $file->getClientOriginalExtension() != 'xls') {
            return 'Tệp không phải là tệp Excel';
        }
        $user = $request->user();
        
        $languageId = $request->input('language_id');
        $languageTranslateId = $request->input('language_translate_id');
        
        $data = Excel::toArray(new Excel(), $file);
        $logImport = new LogImport([
            'user_id' => $user->id,
            'language_id' => $languageId,
            'language_translate_id' => $languageTranslateId,
            'file_name'=>$fileName
        ]);
        $logImport->save();
        foreach ($data[0] as $key => $element){
            // if ($key > 0 && !empty($element[0]) && !empty($element[1]) && !empty($element[2]) && !empty($element[3])) {
            if ($key > 0 && !empty($element[0]) && !empty($element[1]) ) {
                $word = $element[0];
                $translate = $element[1];
                $description = $element[2] ?? $element[3] ?? "";
                $translateDescription = $element[3] ?? $element[2] ?? "";
                $words = new Words();
                // $words->saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription,$logImport->id);
                // // lưu chéo ngược lại
                // $words->saveWithTranslation($languageTranslateId, $languageId, $translate, $word, $translateDescription, $description,$logImport->id);

                $words->saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription,$logImport->id);
                // lưu phiên bảng tiếng việt
                $words->saveWithTranslation($languageId, $languageId, $word, $word, $description, $description,$logImport->id);
            }
        }
        $responseData = ['status' => 200,'success'=>true, 'message' => 'The file word successfully imported'];
        return response()->json($responseData);
    }
    public function translateWordsFromExcel(Request $request)
    {
        $file = $request->file('file');
        if (!$file->isValid() || $file->getClientOriginalExtension() != 'xlsx' && $file->getClientOriginalExtension() != 'xls') {
            return 'Tệp không phải là tệp Excel';
        }
        $data = Excel::toArray(new Excel(), $file);
        $data = $data[0];
        $languageId = $request->input('language_id');
        $languageTranslateId = $request->input('language_translate_id');
        $words = array_map(function($subarray) {
            return $subarray[0];
        }, $data);
        $words = array_filter($words, function ($value) {
            return !is_null($value) && $value !== ''&& $value !== ' ';
        });

        
        $translations = DB::table('translation_word')
        ->join('words', 'words.id', '=', 'translation_word.word_id')
        ->select(
            'translation_word.translate',
            'translation_word.description',
            'translation_word.original_language_description',
            'words.word as word')
        ->whereIn('words.word', $words)
        ->where('words.language_id', '=', $languageId)
        ->where('translation_word.language_id', '=', $languageTranslateId)
        ->whereIn('translation_word.id', function ($query) {
            $query->select(DB::raw('MAX(id)'))
                ->from('translation_word')
                ->groupBy('word_id');
        })
        ->get()
        ->toArray();
        $dataResponse = [];
        foreach ($data as $element){
            $key = array_search($element[0], array_column($translations, 'word'));
            if ($key !== false) {
                $foundElement = $translations[$key];
                $dataResponse[] = [$element[0],$foundElement->translate,$foundElement->description,$foundElement->original_language_description];
            } else {
                $dataResponse[] = [$element[0]];
            }
        }
        $export = new DataExport(collect($dataResponse));
        $fileName = 'translatecallback.xlsx';
        return Excel::download($export, $fileName);
        // return response()->json(["success"=>"success",'data'=>$data,'translations'=>$dataResponse]);
    }
    
}

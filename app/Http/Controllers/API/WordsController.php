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
            ->select('words.id as word_id', 'words.word as word', 'words.description as description', 'words.language_id as language_id', 'words.status as status',
                DB::raw('GROUP_CONCAT(CONCAT("{\"language_id\":", translation_word.language_id, ",\"translate\":\"", translation_word.translate, "\",\"id\":", translation_word.id, "}") SEPARATOR ",") as data'))
            ->join('translation_word', 'words.id', '=', 'translation_word.word_id')
            ->groupBy('words.id', 'words.word', 'words.description', 'words.language_id', 'words.status') // Include all selected columns from 'words' in GROUP BY
            ->distinct('words.id', 'words.status', 'translation_word.language_id')
            // ->limit(10)
            ->get();
        // $words = Words::all()->toArray();
        $languages = Languages::all()->where('status', '>', 0)->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The new word successfully added',
            'data'=> [
                // 'words'=>$words,
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
        $data = Excel::toArray(new Excel(), $file);
        if(!$data[0] || !$data[0][0] ){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Language code not found',
            ];
            return response()->json($responseData);
        }
        if($data[0][0][0] !== "VN"){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Column A must be in Vietnamese',
            ];
            return response()->json($responseData);
        }
        $language = Languages::where('iso_code', $data[0][0][1])->first();
        if(!$language){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Language not support'
            ];
            return response()->json($responseData);
        }

        $user = $request->user();
        
        $languageId = 1;// language gốc bằng tiếng việt
        $languageTranslateId = $language->id;
        
        
        $logImport = new LogImport([
            'user_id' => $user->id,
            'language_id' => $languageId,
            'language_translate_id' => $languageTranslateId,
            'file_name'=>$fileName
        ]);
        $logImport->save();
        foreach ($data[0] as $key => $element){
            // if ($key > 0 && !empty($element[0]) && !empty($element[1]) && !empty($element[2]) && !empty($element[3])) {
            if ($key > 1 && !empty($element[0]) && !empty($element[1]) ) {
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
        $responseData = ['status' => 200,
            'success'=>true,
            'message' => 'The file word successfully imported',
        ];
        return response()->json($responseData);
    }
    public function translateWordsFromExcel(Request $request)
    {
        $file = $request->file('file');
        if (!$file->isValid() || $file->getClientOriginalExtension() != 'xlsx' && $file->getClientOriginalExtension() != 'xls') {
            // return 'Tệp không phải là tệp Excel';
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Tệp không phải là tệp Excel',
            ];
            return response()->json($responseData,400);
        }
        $data = Excel::toArray(new Excel(), $file);
        if(!$data[0] || !$data[0][0] ){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Language code not found',
            ];
            return response()->json($responseData,400);
        }
        if(!$data[0][0][0] =="VN" && !$data[0][0][1]=="VN"){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Language pair is not supported',
            ];
            return response()->json($responseData,400);
        }
        $language = Languages::where('iso_code', $data[0][0][0])->first();
        $languageTranslate = Languages::where('iso_code', $data[0][0][1])->first();
        if(!$language || !$languageTranslate){
            $responseData = ['status' => 200,
                'success'=>false,
                'message' => 'Language not support'
            ];
            return response()->json($responseData,400);
        }
        $languageId = $language->id;
        $languageTranslateId = $languageTranslate->id;
        $dataAction = $data[0];
        array_shift($dataAction);   //remove 2 row first
        array_shift($dataAction);
        $words = array_map(function($subarray) {
            return $subarray[0];
        }, $dataAction);
        $words = array_filter($words, function ($value) {
            return !is_null($value) && $value !== ''&& $value !== ' ';
        });

        // return response()->json(["check words"=>$words]);
        
        $translations = DB::table('words')
            ->select('words.word as word',  'words.status as status',
                DB::raw('GROUP_CONCAT(CASE WHEN translation_word.language_id = ' . $languageTranslateId . ' THEN CONCAT("{\"language_id\":", translation_word.language_id, ",\"translate\":\"", translation_word.translate, "\",\"description\":\"", translation_word.description, "\",\"original_language_description\":\"", translation_word.original_language_description, "\",\"id\":", translation_word.id, "}") END SEPARATOR ",") as data'))
            ->join('translation_word', 'words.id', '=', 'translation_word.word_id')
            ->groupBy('words.id', 'words.word', 'words.description', 'words.language_id', 'words.status') // Include all selected columns from 'words' in GROUP BY
            ->distinct('words.id', 'words.status', 'translation_word.language_id')
            ->whereIn('words.word', $words)
            ->where('words.status',1)
            ->get()->toArray();
            
        $dataResponse = [];
        foreach ($dataAction as $element){
            $key = array_search($element[0], array_column($translations, 'word'));
            if ($key !== false) {

                $foundElement = $translations[$key];
                $arrayTranslates = json_decode('[' . $foundElement->data . ']', true);
                foreach($arrayTranslates as $translate){
                    $dataResponse[] = [$element[0],$translate['translate'],$translate['description'],$translate['original_language_description']];
                }
            } else {
                $dataResponse[] = [$element[0]];
            }
        }
        $export = new DataExport(collect($dataResponse));
        $fileName = 'translatecallback.xlsx';
        $response = Excel::download($export, $fileName);
        return $response;
        // return response()->json(["success"=>"success",'data'=>$data,'translations'=>$dataResponse]);
    }
    
}

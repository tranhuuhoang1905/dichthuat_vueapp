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
use App\Traits\StringHelper;
use App\Repositories\WordRepository;
// export file excel
use Validator;

class WordsController extends Controller
{
    use StringHelper;
    protected $wordRepository;

    public function __construct(WordRepository $wordRepository)
    {
        $this->wordRepository = $wordRepository;
    }

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

    // all words không hiện từ bị ẩn
    public function dataTablesAllWord()
    {
        $wordsTest = DB::table('words')
            ->select('words.id as word_id', 'words.word as word', 'words.description as description', 'words.language_id as language_id', 'words.status as status',
                DB::raw('GROUP_CONCAT(CONCAT("{\"language_id\":", translation_word.language_id, ",\"translate\":\"", translation_word.translate, "\",\"id\":", translation_word.id, "}") SEPARATOR ",") as data'))
            ->join('translation_word', 'words.id', '=', 'translation_word.word_id')
            ->groupBy('words.id', 'words.word', 'words.description', 'words.language_id', 'words.status') // Include all selected columns from 'words' in GROUP BY
            ->distinct('words.id', 'words.status', 'translation_word.language_id')->get();
        return datatables($wordsTest)->make(true);
        // return response()->json($responseData);
    }
    



    
    // all words có các từ bị ẩn
    public function allWord()
    {
        
        // $words = Words::all()->toArray();
        $languages = Languages::all()->where('status', '>', 0)->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The new word successfully added',
            'data'=> [
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
            $responseData = [
                'status' => 200,
                'success'=>false,
                'message' => 'Language code not found',
            ];
            return response()->json($responseData);
        }
        if($data[0][0][0] !== "VN"){
            $responseData = [
                'status' => 200,
                'success'=>false,
                'message' => 'Column A must be in Vietnamese',
            ];
            return response()->json($responseData);
        }
        $language = Languages::where('iso_code', $data[0][0][1])->first();
        if(!$language){
            $responseData = [
                'status' => 200,
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
        $array = [];
        $string = "";
        $stringTranslate = "";
        
        array_shift($data[0]);   //remove 2 row first
        array_shift($data[0]);

        foreach ($data[0] as $key => $element){
            if (!empty($element[0]) && !empty($element[1]) ) {
                //check 
                $string = $element[0];
                $stringTranslate = $element[1];
                $array =$this->splitWord($element[0]);
                $arrayTranslates = $this->splitWord($element[1]);
                if(count($array)!==count($arrayTranslates)){
                    continue;
                }
                $logImportId = $logImport->id;
                $wordData = [
                    "language_id"=> $languageId,
                    "data"=> array_values($array),
                    "description"=>$element[2]??""
                ];
                $translateData = [
                    "language_id"=> $languageTranslateId,
                    "data"=> array_values($arrayTranslates),
                    "description"=>$element[3]??""
                ];
                
                $this->wordRepository->saveWord($wordData,$translateData,$logImportId,$language->iso_code);
            }
        }
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'The file word successfully imported',
            'data'=>[]
            ,
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
        $words =$this->removeEmptyElements($words);
        if(false){
        // if($language->iso_code =="VN"){
            $translations = DB::table('words')
            ->select('words.word as word',  'words.status as status',
                DB::raw('GROUP_CONCAT(CASE WHEN translation_word.language_id = ' . $languageTranslateId . ' THEN CONCAT("{\"language_id\":", translation_word.language_id, ",\"translate\":\"", translation_word.translate, "\",\"description\":\"", translation_word.description, "\",\"original_language_description\":\"", translation_word.original_language_description, "\",\"id\":", translation_word.id, "}") END SEPARATOR ",") as data'))
            ->join('translation_word', 'words.id', '=', 'translation_word.word_id')
            ->groupBy('words.id', 'words.word', 'words.description', 'words.language_id', 'words.status') // Include all selected columns from 'words' in GROUP BY
            ->distinct('words.id', 'words.status', 'translation_word.language_id')
            ->whereIn('words.word', $words)
            // ->where('translation_word.language_id',$languageId)
            ->where('words.status',1)
            ->get()->toArray();
        }else{
            $translations = DB::table('translation_word')
            ->join('words', 'translation_word.word_id', '=', 'words.id')
            ->select('translation_word.translate as word', 'translation_word.status as status',
            DB::raw("GROUP_CONCAT(CONCAT('{\"language_id\":', words.language_id, ',\"translate\":\"', words.word, '\", \"description\":\"', COALESCE(words.description, ''), '\", \"original_language_description\":\"\", \"id\":', words.id, '}') SEPARATOR ', ') AS data")

                )
            ->where('translation_word.language_id', '=', 4)
            ->whereIn('translation_word.translate', $words)
            ->groupBy('translation_word.translate','translation_word.status')
            ->get()->toArray();
        }
        
        foreach ($dataAction as $element){
            $word = $element[0];

            //xu ly cac doan van, chua lam xong
            // $wordArray = $this->splitWordTranslate($word);
            // foreach($wordArray as $wordElement){
            //     $arrayWords = $this->splitWordExport($word);
            // }


            
            $arrayWords = $this->splitWordExport($word);
            $key = array_search(strtolower($arrayWords[0]), array_column($translations, 'word'));
            if ($key !== false) {
                $foundElement = $translations[$key];
                $arrayTranslates = json_decode('[' . $foundElement->data . ']', true);
                if(!is_array($arrayTranslates)){
                    $dataResponse[] = [$word];
                }
                foreach($arrayTranslates as $translate){
                    $dataResponse[] = [$word,$translate['translate'],$translate['description'],$translate['original_language_description']];
                }
            } else {
                $dataResponse[] = [$word];
            }
        }
        // return response()->json(["success"=>"success",'data'=>$data,'translations'=>$dataResponse]);
        $export = new DataExport(collect($dataResponse));
        $fileName = 'translatecallback.xlsx';
        $response = Excel::download($export, $fileName);
        return $response;
        
    }
    
}

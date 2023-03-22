<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Models\Words;
use App\Models\TranslationWord;
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
    // all languages
    public function index()
    {
        $words = Words::all()->toArray();
        return response()->json($words);
    }
 
    // add word
    public function add(Request $request)
    {
        $languageId = $request->input('language_id');
        $languageTranslateId = $request->input('language_translate_id');
        $word = $request->input('word');
        $translate = $request->input('translate');
        $description = $request->input('description');
        $translateDescription = $request->input('translate_description');
        $words = new Words();
        $words->saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription);
        // lưu chéo ngược lại
        $words->saveWithTranslation($languageTranslateId, $languageId, $translate, $word, $translateDescription, $description);
        return response()->json(['msg' =>'The new word successfully added']);
    }
    // edit word
    public function default($id)
    {
        $word = Words::find($id);
        $TranslationWords = TranslationWord::join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->select('languages.name as language', 'translation_word.*')
            ->where('translation_word.word_id', $id)
            ->get()
            ->toArray();
        $dataRep = [
            'word_info' =>$word,
            'translates' => $TranslationWords 
        ];
        return response()->json($dataRep);
    }

    // edit word
    public function alldata($id)
    {
        $word = Words::join('languages', 'words.language_id', '=', 'languages.id')
             ->select('words.*', 'languages.name as language')
             ->where('words.id', $id)
             ->first();
        if(!$word){
            return response()->json([]);
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
        return response()->json([
            'languages'=>$languages,
            'translates' => $Translates,
            'wordDefault' => $word
        ]);
        return response()->json($dataRep);
    }
    
 
    // edit word
    public function edit($id)
    {
        $word = Words::join('languages', 'words.language_id', '=', 'languages.id')
             ->select('words.*', 'languages.name as language')
             ->where('words.id', $id)
             ->first();

             $languages = Languages::all()->toArray();
        return response()->json([
            'word'=>$word,
            'languages'=>$languages
        ]);
    }
 
    // update language
    public function update($id, Request $request)
    {
        $word = Words::find($id);
        $word->update($request->all());
 
        return response()->json('The language successfully updated');
    }
 
    // get top search words
    public function getTopSearchWords()
    {
        $words = Words::select('id','word')
        ->orderByDesc('number_search')
        ->orderByDesc('id')
        ->take(10)
        ->get()
        ->toArray();
        return $words;
    }

    public function importWordsFromExcel(Request $request)
    {
        $file = $request->file('file');
        $data = Excel::toArray(new Excel(), $file);
        $languageId = $request->input('language_id');
        $languageTranslateId = $request->input('language_translate_id');
        foreach ($data[0] as $key => $element){
            if ($key > 0 && !empty($element[0]) && !empty($element[1]) && !empty($element[2]) && !empty($element[3])) {
                $word = $element[0];
                $description = $element[1];
                $translate = $element[2];
                $translateDescription = $element[3];
                $words = new Words();
                $words->saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription);
                // lưu chéo ngược lại
                $words->saveWithTranslation($languageTranslateId, $languageId, $translate, $word, $translateDescription, $description);
            }
        }
        
        return response()->json(["success"=>"success",'data'=>$data, 'languageId'=>$request->input('language_id')]);
    }
    public function translateWordsFromExcel(Request $request)
    {
        $file = $request->file('file');
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

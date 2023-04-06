<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Models\Words;
use App\Models\TranslationWord;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;

class TranslateController extends Controller
{
    // all languages
    public function search(Request $request)
    {
        $languageId = $request->input('language_id');
        $word = $request->input('keyword');
        $mTranslationWord = new TranslationWord();
        $translationWords = $mTranslationWord->searchTranslationWords($languageId, $word);
        if($translationWords){
            Words::where('id', $translationWords[0]['word_id'])
            ->increment('number_search');
            
        }
        
        $translationWordsTest = $mTranslationWord->searchTest($languageId, $word);
        $suggestedWords = $mTranslationWord->searchSuggestedWords($languageId, $word);
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'success',
            'data' =>['suggestedWords' =>$suggestedWords,'translationWords' =>$translationWordsTest,
                'test1'=>$translationWordsTest    
            ]
        ];
        return response()->json($responseData);
    }

    // get top search words
    public function getTopSearchWords(Request $request)
    {
        $languageId = $request->input('language_id');
        $mTranslationWord = new TranslationWord();
        $words = $mTranslationWord->TopSearch($languageId);
        $responseData = [    'status' => 200,'success'=>$languageId,    'message' => 'success',    'data' => $words];
        return response()->json($responseData);
    }
 // edit word
    public function edit($id)
    {
        $translationWord = TranslationWord::join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->select('languages.name as language', 'translation_word.*')
            ->where('translation_word.id', $id)
            ->get()
            ->first();
             $languages = Languages::all()->toArray();
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'success',
            'data'=>[
                'translate'=>$translationWord,
                'languages'=>$languages
            ]
        ];
        return response()->json($responseData);
    }
    
    // update language
    public function update($id, Request $request)
    {
        $translationWord = TranslationWord::find($id);
        $translationWord->update($request->all());
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The translate successfully updated'];
        return response()->json($responseData);
    }  
}

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
        $suggestedWords = $mTranslationWord->searchSuggestedWords($languageId, $word);
        return response()->json(['suggestedWords' =>$suggestedWords,'translationWords' =>$translationWords]);
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
        return response()->json([
            'translate'=>$translationWord,
            'languages'=>$languages
        ]);
    }
    
    // update language
    public function update($id, Request $request)
    {
        $translationWord = TranslationWord::find($id);
        $translationWord->update($request->all());
        return response()->json('The language successfully updated');
    }  
}

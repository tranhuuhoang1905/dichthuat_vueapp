<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Models\Words;
use App\Models\TranslationWord;
use Illuminate\Http\Request;
use Validator;

class TranslateController extends Controller
{
    // all languages
    public function search(Request $request)
    {
        // $request->input('language_id');
        // $request->input('key_word');

        $word = Words::where('language_id', $request->input('language_id'))
        ->where('word', $request->input('key_word'))
        ->first();
        if(!$word){
            return response()->json([]);
        }
        // $TranslationWords = TranslationWord::where('id', $id)->get()->toArray();
        $TranslationWords = TranslationWord::join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->select('languages.name as language', 'translation_word.*')
            ->where('translation_word.word_id', $word->id)
            ->get()
            ->toArray();
        // $dataRep = [
        //     'word_info' =>$word,
        //     'translates' => $TranslationWords 
        // ];
        return response()->json($TranslationWords);
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

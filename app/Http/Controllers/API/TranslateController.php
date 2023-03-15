<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;

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
 
    
}

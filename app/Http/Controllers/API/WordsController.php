<?php

namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
use App\Models\Languages;
use App\Models\Words;
use App\Models\TranslationWord;
use Illuminate\Http\Request;
 
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
        $word = Words::updateOrCreate(
            ['word' => $request->input('word'), 'language_id' => $request->input('language_id')],
            ['word' => $request->input('word'), 'language_id' => $request->input('language_id')]
        );
        
        $wordId = $word->id;

        $translationWord = TranslationWord::where('word_id', $wordId)
        ->where('language_id', $request->input('language_translate_id'))
        ->where('translate', $request->input('translate'))
        ->first();
        if($translationWord){
            return response()->json('Translated word already exists');
        }
        $translationWord = new TranslationWord([
            'word_id' => $wordId,
            'language_id' => $request->input('language_translate_id'),
            'description' => $request->input('translate_description'),
            'translate' => $request->input('translate')
        ]);
        $translationWord->save();

        // lưu chéo ngược lại
        $wordSecond = Words::updateOrCreate(
            ['word' => $request->input('translate'), 'language_id' => $request->input('language_translate_id')],
            ['word' => $request->input('translate'), 'language_id' => $request->input('language_translate_id')]
        );
        $wordSecondId = $wordSecond->id;
        $translationWordSecond = TranslationWord::where('word_id', $wordSecondId)
        ->where('language_id', $request->input('language_id'))
        ->where('translate', $request->input('word'))
        ->first();
        // return response()->json(['msg' =>'The new word successfully added','test'=>$translationWordSecond]);
        if(!$translationWordSecond){
            $translationWordSecond = new TranslationWord([
                'word_id' => $wordSecondId,
                'language_id' => $request->input('language_id'),
                'description' => $request->input('description'),
                'translate' => $request->input('word')
            ]);
            $translationWordSecond->save();
        }
        return response()->json(['msg' =>'The new word successfully added','test'=>$translationWordSecond]);
    }
    // edit word
    public function default($id)
    {
        $word = Words::find($id);
        // $TranslationWords = TranslationWord::where('id', $id)->get()->toArray();
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
        // $TranslationWords = TranslationWord::where('id', $id)->get()->toArray();
        // $word = Words::where('language_id', $request->input('language_id'))
        // ->where('word', $request->input('key_word'))
        // ->first();
        if(!$word){
            return response()->json([]);
        }
        // $TranslationWords = TranslationWord::where('id', $id)->get()->toArray();
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
            'word_default' => $word
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
 
    // // delete language
    // public function delete($id)
    // {
    //     $language = Languages::find($id);
    //     $language->delete();
 
    //     return response()->json('The language successfully deleted');
    // }
}

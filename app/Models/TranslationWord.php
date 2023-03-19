<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class TranslationWord extends Model
{
    use HasFactory;
    protected $table = 'translation_word';

    protected $fillable = [
        'word_id',
        'language_id',
        'translate',
        'description',
        'original_language_description',
        'pronunciation',
        'user_manual',
        'slug',
        'status',
        'comments',
    ];
    public function getTranslationsByWordId($wordId)
    {
        return TranslationWord::join('words', 'translation_word.word_id', '=', 'words.id')
            ->select('translation_word.*', 'words.word')
            ->where('translation_word.word_id', $wordId)
            ->get();
    }
    public function searchTranslationWords($languageId, $word)
    {
        return TranslationWord::join('words', 'translation_word.word_id', '=', 'words.id')
            ->join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->select('languages.name as language', 'translation_word.*')
            ->where('words.word', $word)
            ->where('translation_word.language_id', $languageId)
            ->get()
            ->toArray();
    }

    public function searchSuggestedWords($languageId, $word)
    {
        return DB::table('translation_word')
            ->join('words', 'translation_word.word_id', '=', 'words.id')
            ->where('translation_word.language_id', '=', $languageId)
            ->where('words.word', 'like', '%' . $word . '%')
            ->where('words.word', '!=' , $word)
            ->select(DB::raw('MAX(translation_word.id) AS translation_word_id'), 'words.id', 'words.word', DB::raw('ANY_VALUE(translation_word.translate) as translate'))
            ->groupBy('words.id')
            ->get()
            ->toArray();
    }
}

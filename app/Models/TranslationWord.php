<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TranslationWord extends Model
{
    use HasFactory;
    protected $table = 'translation_word';

    protected $fillable = [
        'word_id',
        'language_id',
        'translate',
        'description',
        'description',
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
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Words extends Model
{
    use HasFactory;
    protected $table = 'words';

    protected $fillable = [
        'word',
        'language_id',
        'number_search',
        'number_add_notebook',
        'description',
        'pronunciation',
        'user_manual',
        'slug',
        'status',
        'synonym',
    ];
    public function saveWithTranslation($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription,$logImportId)
    {
        DB::transaction(function () use ($languageId, $languageTranslateId, $word, $translate, $description, $translateDescription,$logImportId) {
            $word = self::updateOrCreate(
                ['word' => $word, 'language_id' => $languageId]
            );

            $wordId = $word->id;

            $translationWord = TranslationWord::where('word_id', $wordId)
                ->where('language_id', $languageTranslateId)
                ->where('translate', $translate)
                ->first();

            if (!$translationWord) {
                $translationWord = new TranslationWord([
                    'word_id' => $wordId,
                    'language_id' => $languageTranslateId,
                    'description' => $translateDescription,
                    'original_language_description' => $description,
                    'translate' => $translate,
                    'log_import_id' =>$logImportId
                ]);
                $translationWord->save();
            }
        });
    }
}

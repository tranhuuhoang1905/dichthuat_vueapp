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
        'log_import_id'
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
            ->where('words.status', '>',0)
            ->when($languageId != 0, function ($query) use ($languageId) {
                return $query->where('translation_word.language_id', $languageId);
            })
            ->get()
            ->toArray();
    }

    public function searchSuggestedWords($languageId, $word)
    {
        $wordChilds = explode(" ",$word);

        $results = DB::table('translation_word')
            ->join('words', 'translation_word.word_id', '=', 'words.id')
            ->when($languageId !== 0, function ($query) use ($languageId) {
                return $query->where('translation_word.language_id', '=', $languageId);
            })
            ->where('words.word', '!=', $word)
            ->where('words.status', '>', 0)
            ->where(function ($query) use ($wordChilds) {
                foreach ($wordChilds as $wordChild) {
                    $query->orWhere('words.word', 'like' , '%' . $wordChild . '%');
                }
            })
            ->select(DB::raw('MAX(translation_word.id) AS translation_word_id'), 'words.id', 'words.word', DB::raw("SUBSTRING_INDEX(GROUP_CONCAT(translation_word.translate SEPARATOR ' '), ' ', 1) as translate"))
            ->groupBy('words.id', 'words.word')
            ->get()
            ->toArray();
        return $results;
    }

    public function TopSearch($languageId)
    {
        return  TranslationWord::select('translation_word.word_id', 'words.id', 'words.word')
        ->join('words', 'words.id', '=', 'translation_word.word_id')
        ->when($languageId !== 0, function ($query) use ($languageId) {
            $query->where('translation_word.language_id', '=', $languageId);
        })
        ->where('words.status', '>', 0)
        ->groupBy('translation_word.word_id', 'words.id', 'words.word', 'words.id')
        ->orderByDesc('words.number_search')
        ->take(10)
        ->get()
        ->toArray();
    }

    public function searchTest($languageId, $word)
    {
        $translationWordsTest = [];
        if (true){
            // tìm tất cả các từ bằng ngôn ngữ tiếng việt có word = $word 
            $translationWordsTest = DB::table('translation_word')
            ->select('translation_word.id', 'translation_word.language_id', 'translation_word.description', 'languages.name as language', 'translation_word.*')
            ->join('words', 'translation_word.word_id', '=', 'words.id')
            ->join('languages', 'translation_word.language_id', '=', 'languages.id')
            ->where('words.word', $word)
            ->when($languageId !== 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '=', $languageId);
            })
            ->get()->toArray();
            if(count($translationWordsTest) == 0 ){
                // Tìm tất cả các từ trong bảng "translation_word" có "translate" bằng $word và "language_id" khác $languageId,
                // sau lấy tất cả các hàng có cột "word_id" trong danh sách tìm được để lưu vào mảng $translationWordsTest
                $translationWordsTest = DB::table('translation_word')
                ->whereIn('word_id', function($query) use ($word, $languageId) {
                    $query->select('word_id')
                        ->from('translation_word')
                        ->where('translate', $word)
                        ->when($languageId !== 0, function ($query) use ($languageId) {
                            $query->where('translation_word.language_id', '!=', $languageId);
                        })
                        ->distinct();
                })
                ->leftJoin('languages', 'languages.id', '=', 'translation_word.language_id')
                ->select(DB::raw('MIN(translation_word.word_id) AS word_id'), DB::raw('MIN(translation_word.language_id) AS language_id'), DB::raw('MIN(translation_word.translate) AS translate'), DB::raw('MIN(translation_word.description) AS description'), DB::raw('MIN(languages.name) AS language'))
                ->when($languageId !== 0, function ($query) use ($languageId) {
                    $query->where('translation_word.language_id', '=', $languageId);
                })
                ->groupBy('translation_word.translate')
                ->get()
                ->toArray();


            

            }
        }
        
        
        return $translationWordsTest;
    }
}

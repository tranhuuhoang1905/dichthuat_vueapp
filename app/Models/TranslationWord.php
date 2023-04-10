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
        $translationWords = [];
        // ngôn ngữ nhập vào là tiếng việt
        // Tìm tất cả các từ trong bảng "translation_word" có "translate" bằng $word và "language_id" khác $languageId,
        // sau lấy tất cả các hàng có cột "word_id" trong danh sách tìm được để lưu vào mảng $translationWordsTest
        $translationWords = DB::table('translation_word')
            ->leftJoin(DB::raw('(SELECT DISTINCT tw.word_id, l.name AS language_from FROM translation_word tw JOIN languages l ON tw.language_id = l.id WHERE tw.translate = ? AND ((tw.language_id != ? and ? > 0) OR (tw.language_id = 1 and ? = 0))) AS subquery'), function ($join) use ($word, $languageId) {
                $join->on('translation_word.word_id', '=', 'subquery.word_id');
            }, 'left')
            ->whereNotNull('subquery.word_id')
            ->setBindings([$word, $languageId, $languageId, $languageId]) // Thêm giá trị của $word, $languageId vào danh sách bindings
            ->leftJoin('languages', 'languages.id', '=', 'translation_word.language_id')
            ->select(DB::raw('MIN(translation_word.word_id) AS word_id'), DB::raw('MIN(translation_word.language_id) AS language_id'), DB::raw('MIN(translation_word.translate) AS translate'), DB::raw('MIN(translation_word.description) AS description'), DB::raw('MIN(languages.name) AS language'), DB::raw('MIN(subquery.language_from) AS language_from'))
            ->when($languageId !== 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '=', $languageId);
            })
            ->when($languageId == 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '!=', 1);
            })
            ->groupBy('translation_word.translate')
            ->get()
            ->toArray();

        //khi ngôn ngữ nhập vào không phải tiếng việt và languageId = 0 thì không xác định được ngôn ngữ nhập là gì
        //nên tìm thêm các từ trong translation_word có languageId = 1 
        $translationWordsAllToVi = [];
        if ($languageId == 0 ){
            $translationWordsAllToVi = DB::table('translation_word')
            ->leftJoin(DB::raw('(SELECT DISTINCT tw.word_id, l.name AS language_from FROM translation_word tw JOIN languages l ON tw.language_id = l.id WHERE tw.translate = ? AND tw.language_id != ?) AS subquery'), function ($join) use ($word, $languageId) {
                $join->on('translation_word.word_id', '=', 'subquery.word_id');
            }, 'left')
            ->whereNotNull('subquery.word_id')
            ->setBindings([$word, $languageId]) // Thêm giá trị của $word, $languageId vào danh sách bindings
            ->leftJoin('languages', 'languages.id', '=', 'translation_word.language_id')
            ->select(DB::raw('MIN(translation_word.word_id) AS word_id'), DB::raw('MIN(translation_word.language_id) AS language_id'), DB::raw('MIN(translation_word.translate) AS translate'), DB::raw('MIN(translation_word.description) AS description'), DB::raw('MIN(languages.name) AS language'), DB::raw('MIN(subquery.language_from) AS language_from'))
            ->when($languageId !== 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '=', $languageId);
            })
            ->when($languageId == 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '=', 1);
            })
            ->groupBy('translation_word.translate')
            ->get()
            ->toArray();
        }
        
        // lưu number search
        DB::table('words')
        ->whereIn('id', function ($query) use ($word) {
            $query->select('word_id')
                    ->from('translation_word')
                    ->where('translate', $word);
        })
        ->increment('number_search', 1);

        return array_merge($translationWords,$translationWordsAllToVi);
    }

    public function searchSuggestedWords($languageId, $word)
    {
        $wordChilds = explode(" ",$word);
        $results =[];
        if($languageId == 0 or $languageId == 1){

            $results = DB::table('translation_word')
                ->select('id','translate as word')
                ->where('translate', '!=', $word)
                ->when($languageId == 1, function ($query) use ($languageId) {
                    $query->where('language_id', '!=', $languageId);
                })
                ->where(function ($query) use ($wordChilds) {
                    foreach ($wordChilds as $wordChild) {
                        $query->orWhere('translate', 'like' , '%' . $wordChild . '%');
                    }
                })
                ->get();
        }else{
                // trường hợp dịch từ tiếng việt sang các ngôn ngữ khác
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
        }
        
        
        
        return $results;
    }

    public function TopSearch($languageId)
    {
        // tìm tất cả các word_id
        $TopSearch = TranslationWord::select('translation_word.word_id', 'words.id', 'translation_word.translate as word', 'words.number_search')
            ->join('words', 'words.id', '=', 'translation_word.word_id')
            ->when($languageId == 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '=', 1);
            })
            ->when($languageId > 0, function ($query) use ($languageId) {
                $query->where('translation_word.language_id', '!=', $languageId);
            })
            ->when($languageId != 0, function ($query) use ($languageId) {
                $query->whereIn('translation_word.word_id', function ($query) use ($languageId) {
                    $query->select('word_id')
                        ->from('translation_word')
                        ->where('language_id', $languageId);
                });
            }) // Thêm điều kiện kiểm tra nếu $languageId khác 0 thì mới thêm điều kiện "word_id" nằm trong kết quả của truy vấn con
            ->where('words.status', '>', 0)
            ->orderByDesc('words.number_search')
            ->distinct('words.id')
            ->take(10)
            ->get()
            ->toArray();

        return $TopSearch;
    }

    
}

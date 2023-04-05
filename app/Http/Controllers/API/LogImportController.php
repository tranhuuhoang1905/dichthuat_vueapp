<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LogImport;
use App\Models\TranslationWord;
use Illuminate\Support\Facades\DB;
use App\Models\Words;

class LogImportController extends Controller
{
    // all languages
    public function index(Request $request)
    {

        $LogImport = LogImport::all()->toArray();
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'success',    'data' => $LogImport];
        return response()->json($responseData);
    }
 
    public function rollback($id, Request $request)
    {
        TranslationWord::where('log_import_id', $id)->delete();
        Words::whereNotExists(function ($query) {
                $query->select(DB::raw(1))
                    ->from('translation_word')
                    ->whereRaw('words.id = translation_word.word_id');
            })
            ->delete();
        $LogImport = LogImport::where('id', $id)
            ->first();
        $LogImport->status = 0;
        $LogImport->save();
        $responseData = [
            'status' => 200,
            'success'=> true,
            'message' => 'success',
            'data' => $LogImport
        ];
        return response()->json($responseData);
    }
}

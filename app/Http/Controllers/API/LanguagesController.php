<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Languages;

class LanguagesController extends Controller
{
    // all languages
    public function index(Request $request)
    {

        $languages = Languages::all()->toArray();
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'success',    'data' => $languages];
        return response()->json($responseData);
    }
 
    // add language
    public function add(Request $request)
    {
        $language = new Languages([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);
        $language->save();
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The language successfully added'];
        return response()->json($responseData);
    }

    // edit language
    public function edit($id)
    {
        $language = Languages::find($id);
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'success',
            'data'=>['language'=>$language]
    ];
        return response()->json($responseData);
    }
 
    // update language
    public function update($id, Request $request)
    {
        $language = Languages::find($id);
        $language->update($request->all());
        $responseData = [    'status' => 200,'success'=>true,    'message' => 'The language successfully updated'];
        return response()->json($responseData);
    }
 
    // delete language
    public function delete($id)
    {
        $language = Languages::find($id);
        $language->delete();
        return response()->json('The language successfully deleted');
    }
}

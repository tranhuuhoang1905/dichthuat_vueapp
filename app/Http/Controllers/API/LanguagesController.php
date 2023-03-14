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
        return response()->json($languages);
        // return array_reverse($languages);
    }
 
    // add language
    public function add(Request $request)
    {
        $language = new Languages([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);
        $language->save();
        return response()->json('The language successfully added');
    }
 
    // edit language
    public function edit($id)
    {
        $language = Languages::find($id);
        return response()->json($language);
    }
 
    // update language
    public function update($id, Request $request)
    {
        $language = Languages::find($id);
        $language->update($request->all());
 
        return response()->json('The language successfully updated');
    }
 
    // delete language
    public function delete($id)
    {
        $language = Languages::find($id);
        $language->delete();
 
        return response()->json('The language successfully deleted');
    }
}

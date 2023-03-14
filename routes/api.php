<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LanguagesController;
use App\Http\Controllers\API\WordsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::group(['middleware' => ['guest']], function () {
//     Route::post('login', 'App\Http\Controllers\API\AuthController@login');
// });
Route::post('/login', [AuthController::class, 'login']);


Route::post('/languages', [LanguagesController::class, 'index'])->middleware('auth:sanctum','leader');
Route::group(['prefix' => 'language','middleware' => ['auth:sanctum', 'admin']], function () {
    Route::post('add', [LanguagesController::class, 'add']);
    Route::get('edit/{id}', [LanguagesController::class, 'edit']);
    Route::post('update/{id}', [LanguagesController::class, 'update']);
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::delete('delete/{id}', [LanguagesController::class, 'delete']);
});

Route::post('/words', [WordsController::class, 'index'])->middleware('auth:sanctum','leader');
Route::group(['prefix' => 'word','middleware' => ['auth:sanctum', 'leader']], function () {
    Route::post('add', [WordsController::class, 'add']);
    Route::get('edit/{id}', [WordsController::class, 'edit']);
    Route::get('default/{id}', [WordsController::class, 'default']);
    Route::post('update/{id}', [WordsController::class, 'update']);
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::delete('delete/{id}', [WordsController::class, 'delete']);
});
Route::group(['middleware' => ['auth:sanctum']], function() {
    // Route::get('/logout', [LanguagesController::class, 'index']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });



    // Route::group(['prefix' => 'admin'], function(){
    //     Route::get('/', [ProductController::class, 'index']);
    //     Route::get('/products/delete', [ProductController::class, 'del']);
        
    //     Route::resource('products', ProductController::class)->only(['index', 'show', 'create', 'edit']);
    //     Route::resource('roles', RoleController::class);
    //     Route::resource('permissions', PermissionController::class);
    // });
});

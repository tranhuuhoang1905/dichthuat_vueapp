<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LanguagesController;
use App\Http\Controllers\API\WordsController;
use App\Http\Controllers\API\TranslateController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\LogImportController;

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
Route::post('/check-login', [AuthController::class, 'checkLogin']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/first-login', [AuthController::class, 'firstLogin']);
Route::post('/register', [AuthController::class, 'register']);


Route::get('/languages', [LanguagesController::class, 'index']);
// Route::get('/languages', [LanguagesController::class, 'index'])->middleware('auth:sanctum');
Route::group(['prefix' => 'language','middleware' => ['auth:sanctum, permission:Language Manager']], function () {
    Route::post('add', [LanguagesController::class, 'add']);
    Route::get('all-language', [LanguagesController::class, 'allLanguage']);
    Route::get('edit/{id}', [LanguagesController::class, 'edit']);

    Route::post('update/{id}', [LanguagesController::class, 'update']);
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::delete('delete/{id}', [LanguagesController::class, 'delete']);
});

// Route::post('/words', [WordsController::class, 'index'])->middleware('auth:sanctum');

// Route::group(['prefix' => 'word','middleware' => ['auth:sanctum', 'leader']], function () {
Route::group(['prefix' => 'word','middleware' => ['auth:sanctum']], function () {
    Route::post('all-word', [WordsController::class, 'allWord'])->middleware('permission:Word manager');
    Route::post('add', [WordsController::class, 'add'])->middleware('permission:Word manager');
    Route::get('edit/{id}', [WordsController::class, 'edit'])->middleware('permission:Word manager');
    Route::get('alldata/{id}', [WordsController::class, 'alldata'])->middleware('permission:Word manager');
    Route::post('update/{id}', [WordsController::class, 'update'])->middleware('permission:Word manager');
    Route::post('suggestions', [WordsController::class, 'suggestions'])->middleware('permission:Word manager');
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    // Route::delete('delete/{id}', [WordsController::class, 'delete']);
    Route::post('/save-words-from-excel', [WordsController::class, 'importWordsFromExcel'])->middleware('permission:Import Excel');
    Route::post('/translate-words-from-excel', [WordsController::class, 'translateWordsFromExcel'])->middleware('permission:Translate File Excel');
});

Route::group(['prefix' => 'translate'], function () {
    Route::post('/search', [TranslateController::class, 'search']);
    Route::post('/top-search-words', [TranslateController::class, 'getTopSearchWords']);
    Route::get('edit/{id}', [TranslateController::class, 'edit'])->middleware('auth:sanctum, permission:Word manager');
    Route::post('update/{id}', [TranslateController::class, 'update'])->middleware('auth:sanctum, permission:Word manager');
    Route::post('get-translate-with-language', [TranslateController::class, 'getTranslateWithLanguage'])->middleware('auth:sanctum, permission:Word manager');
});
Route::group(['prefix' => 'user','middleware' => ['auth:sanctum']], function() {
    // Route::get('/logout', [LanguagesController::class, 'index']);

    Route::get('/', function (Request $request) {
        $user = $request->user();
        $user->load([
            'roles' => function ($query) {
                $query->where('status', 1);
            },
            'roles.permissions' => function ($query) {
                $query->where('status', 1);
            }
        ]);
        $responseData = [
            'status' => 200,
            'success'=>true,
            'message' => 'success',
            'data'=>['user'=>$user]
        ];
        return response()->json($responseData);
    });
    Route::get('allusers' , [UserController::class, 'allusers'])->middleware('permission:User Manager');
    Route::get('roles', [UserController::class, 'roles'])->middleware('permission:User Manager');
    Route::post('create-new-user', [UserController::class, 'createNewUser'])->middleware('permission:User Manager');
    Route::get('edit/{id}', [UserController::class, 'edit'])->middleware('permission:User Manager');
    Route::post('change-role-user/{id}', [UserController::class, 'changeRoleUser'])->middleware('permission:User Manager');
    Route::post('admin-change-password-user/{id}', [UserController::class, 'adminChangePasswordUser'])->middleware('permission:User Manager');
    Route::post('user-change-password', [UserController::class, 'userChangePassword']);
    Route::post('update', [UserController::class, 'updateUser']);
});

// Route::get('/log-import', [LogImportController::class, 'index'])->middleware('auth:sanctum');
Route::group(['prefix' => 'log-import','middleware' => ['auth:sanctum, permission:Log Import']], function() {
    Route::get('/' , [LogImportController::class, 'index']);
    Route::post('rollback/{id}' , [LogImportController::class, 'rollback']);
});

Route::group(['prefix' => 'role','middleware' => ['auth:sanctum, permission:Role Manager']], function () {
    Route::get('all', [UserController::class, 'allRoles']);
    Route::post('add', [UserController::class, 'addRole']);
    // Route::get('edit/{id}', [UserController::class, 'editRole']);

    Route::post('update/{id}', [UserController::class, 'updateRole']);
    // //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::post('update-status/{id}', [UserController::class, 'updateStatusRole']);
});

Route::group(['prefix' => 'permission','middleware' => ['auth:sanctum, permission:Permission Manager']], function () {
    Route::get('all', [UserController::class, 'allPermissions']);
    Route::post('add', [UserController::class, 'addPermission']);
    Route::post('update/{id}', [UserController::class, 'updatePermission']);
    Route::post('update-status/{id}', [UserController::class, 'updateStatusPermission']);
    // Route::get('edit/{id}', [LanguagesController::class, 'edit']);

    // Route::post('update/{id}', [LanguagesController::class, 'update']);
    // //người có role:admin mới có quyền truy cập link api/posts/delete 
    // Route::delete('delete/{id}', [LanguagesController::class, 'delete']);
});
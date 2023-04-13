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
Route::group(['prefix' => 'language','middleware' => ['auth:sanctum, role:admin,leader']], function () {
    Route::post('add', [LanguagesController::class, 'add'])->middleware('role:admin');
    Route::get('all-language', [LanguagesController::class, 'allLanguage']);
    Route::get('edit/{id}', [LanguagesController::class, 'edit'])->middleware('role:admin');

    Route::post('update/{id}', [LanguagesController::class, 'update'])->middleware('role:admin');
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::delete('delete/{id}', [LanguagesController::class, 'delete'])->middleware('role:admin');
});

Route::post('/words', [WordsController::class, 'index'])->middleware('auth:sanctum,role:admin,leader');

// Route::group(['prefix' => 'word','middleware' => ['auth:sanctum', 'leader']], function () {
Route::group(['prefix' => 'word','middleware' => ['auth:sanctum, role:admin,leader']], function () {
    Route::post('all-word', [WordsController::class, 'allWord']);
    Route::post('add', [WordsController::class, 'add']);
    Route::get('edit/{id}', [WordsController::class, 'edit']);
    Route::get('alldata/{id}', [WordsController::class, 'alldata']);
    // Route::get('default/{id}', [WordsController::class, 'default']);
    Route::post('update/{id}', [WordsController::class, 'update']);
    //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::delete('delete/{id}', [WordsController::class, 'delete']);
    Route::post('/save-words-from-excel', [WordsController::class, 'importWordsFromExcel'])->middleware('role:admin');
    Route::post('/translate-words-from-excel', [WordsController::class, 'translateWordsFromExcel']);
    Route::post('suggestions', [WordsController::class, 'suggestions']);
});

Route::group(['prefix' => 'translate'], function () {
    Route::post('/search', [TranslateController::class, 'search']);
    Route::post('/top-search-words', [TranslateController::class, 'getTopSearchWords']);
    Route::get('edit/{id}', [TranslateController::class, 'edit']);
    Route::post('update/{id}', [TranslateController::class, 'update']);
    Route::post('get-translate-with-language', [TranslateController::class, 'getTranslateWithLanguage']);
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
    Route::get('allusers' , [UserController::class, 'allusers'])->middleware('role:admin');
    Route::get('roles', [UserController::class, 'roles'])->middleware('role:admin,leader');
    Route::post('create-new-user', [UserController::class, 'createNewUser'])->middleware('role:admin');
    Route::get('edit/{id}', [UserController::class, 'edit'])->middleware('role:admin');
    Route::post('change-role-user/{id}', [UserController::class, 'changeRoleUser'])->middleware('role:admin');
    Route::post('admin-change-password-user/{id}', [UserController::class, 'adminChangePasswordUser'])->middleware('role:admin');
    Route::post('user-change-password', [UserController::class, 'userChangePassword'])->middleware('role:admin');
    Route::post('update', [UserController::class, 'updateUser'])->middleware('role:admin');
});

// Route::get('/log-import', [LogImportController::class, 'index'])->middleware('auth:sanctum,role:admin,leader');
Route::group(['prefix' => 'log-import','middleware' => ['auth:sanctum']], function() {
    Route::get('/' , [LogImportController::class, 'index'])->middleware('role:admin,leader');
    Route::post('rollback/{id}' , [LogImportController::class, 'rollback'])->middleware('role:admin,leader');
});

Route::group(['prefix' => 'role','middleware' => ['auth:sanctum, role:admin,leader']], function () {
    Route::get('all', [UserController::class, 'allRoles']);
    Route::post('add', [UserController::class, 'addRole'])->middleware('role:admin');
    // Route::get('edit/{id}', [UserController::class, 'editRole'])->middleware('role:admin');

    Route::post('update/{id}', [UserController::class, 'updateRole'])->middleware('role:admin');
    // //người có role:admin mới có quyền truy cập link api/posts/delete 
    Route::post('update-status/{id}', [UserController::class, 'updateStatusRole'])->middleware('role:admin');
});

Route::group(['prefix' => 'permission','middleware' => ['auth:sanctum, role:admin,leader']], function () {
    Route::get('all', [UserController::class, 'allPermissions']);
    Route::post('add', [UserController::class, 'addPermission'])->middleware('role:admin');
    Route::post('update/{id}', [UserController::class, 'updatePermission'])->middleware('role:admin');
    Route::post('update-status/{id}', [UserController::class, 'updateStatusPermission'])->middleware('role:admin');
    // Route::get('edit/{id}', [LanguagesController::class, 'edit'])->middleware('role:admin');

    // Route::post('update/{id}', [LanguagesController::class, 'update'])->middleware('role:admin');
    // //người có role:admin mới có quyền truy cập link api/posts/delete 
    // Route::delete('delete/{id}', [LanguagesController::class, 'delete'])->middleware('role:admin');
});
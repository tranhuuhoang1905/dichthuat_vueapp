<?php

namespace App\Repositories;
use App\Models\Languages;
use App\Models\Words;

class WordRepository
{
    public function saveWord($wordData,$translateData,$logImportId,$languageISOTranslate){
        $special_chars = '/[%{}$+\-\*\'\"\“\/<>#;.\[,\]():]/';
        $special_cn_chars = '[\%\{\}\$\+\-\*\'\"\“\/\<\>\#\;\.\[\, \]\(\)\:]';
        $languageId = $wordData['language_id'];
        $language = Languages::find($languageId);
        
        $array = $wordData['data'];
        $description = $wordData['description'];

        $languageTranslateId = $translateData['language_id'];
        $languageTranslate = Languages::find($languageTranslateId);
        $arrayTranslates = $translateData['data'];
        $descriptionTranslate = $translateData['description'];
        $description = $description ?? $descriptionTranslate ?? "";
        $translateDescription = $descriptionTranslate ?? $description ?? "";
        $words = new Words();
        for ($key = 0; $key < count($array); $key++) {
            $word = trim($array[$key]);
            if($language->iso_code == "CN"){
                $word = str_replace(" ", "", $word);
            }
            $translate = trim($arrayTranslates[$key]);
            if($languageTranslate->iso_code == "CN"){
                $translate = str_replace(" ", "", $translate);
            }
            if (preg_match($special_chars, $word) ) {
                continue;
            }
            if($languageISOTranslate == "CN"){
                mb_regex_encoding("UTF-8");
                if (mb_ereg($special_cn_chars, $translate)) {
                    continue; 
                }
            }else{
                if(preg_match($special_chars, $translate)){
                    continue; 
                }
            }
            $words->saveWithTranslation($languageId, $languageTranslateId, mb_strtolower($word), mb_strtolower($translate), $description, $translateDescription, $logImportId);
            // lưu phiên bảng tiếng việt
            $words->saveWithTranslation($languageId, $languageId, mb_strtolower($word), mb_strtolower($word), $description, $description, $logImportId);
        }
    }
}

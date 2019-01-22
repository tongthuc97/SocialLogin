import { TranslateLoader, MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

export class CustomHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        console.log('MissingTranslationHandlerParams', params);
    }
}
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export class LanguageItem {
    Name: string;
    Key: string;
    IconSrc: string;
}
export const LanguageItemList: LanguageItem[] = [
    {
        Name: 'English',
        Key: 'en',
        IconSrc: 'assets/global/img/flags/us.png'
    }, {
        Name: 'Việt Nam',
        Key: 'vi',
        IconSrc: 'assets/global/img/flags/vn.png'
    }
];
// https://github.com/biesbjerg/ngx-translate-extract
// npm run extract
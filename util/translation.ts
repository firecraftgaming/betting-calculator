const languages = [
  'en',
  'sv',
] as const;

type TranslationKey = string | Translation;
type Translation = {
  [key: string]: TranslationKey;
}
type Language = typeof languages[number];
type Translations = {
  [key in Language]?: Translation;
};

const translations: Translations = {
  sv: {
    group: {
      title: 'Grupper',
      name: 'Gruppnamn',
    },
    player: {
      title: 'Spelare',
      name: 'Spelarnamn',

      betting: {
        on: 'Bettar På',
        amount: 'Bettar',
      },
      winning: {
        amount: 'Vinner',
      },
    },
  },
  en: {
    group: {
      title: 'Groups',
      name: 'Group name',
    },
    player: {
      title: 'Players',
      name: 'Player name',

      betting: {
        on: 'Betting on',
        amount: 'Betting',
      },
      winning: {
        amount: 'Winning',
      },
    },
  }
};

export class TranslationService {
  private static getLanguage(): Language {
    if (typeof navigator === 'undefined') return languages[0];

    const osLanguage = navigator.language.split('-')[0].toLowerCase() as Language;
    if (languages.includes(osLanguage)) return osLanguage;

    return languages[0];
  }

  public static getBy(language: Language, key: string): string | undefined {
    let value: TranslationKey | undefined = translations[language];
    
    const path = key.split('.');
    for (let i = 0; i < path.length; i++) {
      if (typeof value === 'string') value = undefined;
      if (!value) break;
      value = value[path[i]];
    }

    return typeof value === 'string' ? value : undefined;
  }
  public static get(key: string): string {
    return this.getBy(this.getLanguage(), key) ?? this.getBy('en', key) ?? key;
  }
}
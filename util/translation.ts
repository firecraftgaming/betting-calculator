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
    },
    player: {
      title: 'Spelare',
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
    },
    player: {
      title: 'Players',
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
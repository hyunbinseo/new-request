// Reference https://cloud.google.com/text-to-speech/docs/voices

export type VoiceSelectionParams =
	| {
			languageCode: 'af-ZA';
			ssmlGender?: 'FEMALE';
			name?: 'af-ZA-Standard-A';
	  }
	| {
			languageCode: 'ar-XA';
			ssmlGender?: 'MALE';
			name?:
				| 'ar-XA-Standard-B' //
				| 'ar-XA-Standard-C'
				| 'ar-XA-Wavenet-B'
				| 'ar-XA-Wavenet-C';
	  }
	| {
			languageCode: 'ar-XA';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ar-XA-Standard-A' //
				| 'ar-XA-Standard-D'
				| 'ar-XA-Wavenet-A'
				| 'ar-XA-Wavenet-D';
	  }
	| {
			languageCode: 'eu-ES';
			ssmlGender?: 'FEMALE';
			name?:
				| 'eu-ES-Standard-A' //
				| 'eu-ES-Standard-B';
	  }
	| {
			languageCode: 'bn-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'bn-IN-Standard-B' //
				| 'bn-IN-Standard-D'
				| 'bn-IN-Wavenet-B'
				| 'bn-IN-Wavenet-D';
	  }
	| {
			languageCode: 'bn-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'bn-IN-Standard-A' //
				| 'bn-IN-Standard-C'
				| 'bn-IN-Wavenet-A'
				| 'bn-IN-Wavenet-C';
	  }
	| {
			languageCode: 'bg-BG';
			ssmlGender?: 'FEMALE';
			name?:
				| 'bg-BG-Standard-A' //
				| 'bg-BG-Standard-B';
	  }
	| {
			languageCode: 'ca-ES';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ca-ES-Standard-A' //
				| 'ca-ES-Standard-B';
	  }
	| {
			languageCode: 'yue-HK';
			ssmlGender?: 'MALE';
			name?:
				| 'yue-HK-Standard-B' //
				| 'yue-HK-Standard-D';
	  }
	| {
			languageCode: 'yue-HK';
			ssmlGender?: 'FEMALE';
			name?:
				| 'yue-HK-Standard-A' //
				| 'yue-HK-Standard-C';
	  }
	| {
			languageCode: 'cs-CZ';
			ssmlGender?: 'FEMALE';
			name?:
				| 'cs-CZ-Standard-A' //
				| 'cs-CZ-Wavenet-A';
	  }
	| {
			languageCode: 'da-DK';
			ssmlGender?: 'MALE';
			name?:
				| 'da-DK-Standard-C' //
				| 'da-DK-Standard-G'
				| 'da-DK-Wavenet-C';
	  }
	| {
			languageCode: 'da-DK';
			ssmlGender?: 'FEMALE';
			name?:
				| 'da-DK-Neural2-D' //
				| 'da-DK-Standard-A'
				| 'da-DK-Standard-D'
				| 'da-DK-Standard-E'
				| 'da-DK-Standard-F'
				| 'da-DK-Wavenet-A'
				| 'da-DK-Wavenet-D'
				| 'da-DK-Wavenet-E';
	  }
	| {
			languageCode: 'nl-BE';
			ssmlGender?: 'MALE';
			name?:
				| 'nl-BE-Standard-B' //
				| 'nl-BE-Standard-D'
				| 'nl-BE-Wavenet-B';
	  }
	| {
			languageCode: 'nl-BE';
			ssmlGender?: 'FEMALE';
			name?:
				| 'nl-BE-Standard-A' //
				| 'nl-BE-Standard-C'
				| 'nl-BE-Wavenet-A';
	  }
	| {
			languageCode: 'nl-NL';
			ssmlGender?: 'MALE';
			name?:
				| 'nl-NL-Standard-B' //
				| 'nl-NL-Standard-C'
				| 'nl-NL-Standard-G'
				| 'nl-NL-Wavenet-B'
				| 'nl-NL-Wavenet-C';
	  }
	| {
			languageCode: 'nl-NL';
			ssmlGender?: 'FEMALE';
			name?:
				| 'nl-NL-Standard-A' //
				| 'nl-NL-Standard-D'
				| 'nl-NL-Standard-E'
				| 'nl-NL-Standard-F'
				| 'nl-NL-Wavenet-A'
				| 'nl-NL-Wavenet-D'
				| 'nl-NL-Wavenet-E';
	  }
	| {
			languageCode: 'en-AU';
			ssmlGender?: 'MALE';
			name?:
				| 'en-AU-Neural2-B' //
				| 'en-AU-Neural2-D'
				| 'en-AU-News-G'
				| 'en-AU-Polyglot-1'
				| 'en-AU-Standard-B'
				| 'en-AU-Standard-D'
				| 'en-AU-Wavenet-B'
				| 'en-AU-Wavenet-D';
	  }
	| {
			languageCode: 'en-AU';
			ssmlGender?: 'FEMALE';
			name?:
				| 'en-AU-Neural2-A' //
				| 'en-AU-Neural2-C'
				| 'en-AU-News-E'
				| 'en-AU-News-F'
				| 'en-AU-Standard-A'
				| 'en-AU-Standard-C'
				| 'en-AU-Wavenet-A'
				| 'en-AU-Wavenet-C';
	  }
	| {
			languageCode: 'en-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'en-IN-Journey-D' //
				| 'en-IN-Neural2-B'
				| 'en-IN-Neural2-C'
				| 'en-IN-Standard-B'
				| 'en-IN-Standard-C'
				| 'en-IN-Standard-F'
				| 'en-IN-Wavenet-B'
				| 'en-IN-Wavenet-C'
				| 'en-IN-Wavenet-F';
	  }
	| {
			languageCode: 'en-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'en-IN-Journey-F' //
				| 'en-IN-Neural2-A'
				| 'en-IN-Neural2-D'
				| 'en-IN-Standard-A'
				| 'en-IN-Standard-D'
				| 'en-IN-Standard-E'
				| 'en-IN-Wavenet-A'
				| 'en-IN-Wavenet-D'
				| 'en-IN-Wavenet-E';
	  }
	| {
			languageCode: 'en-GB';
			ssmlGender?: 'MALE';
			name?:
				| 'en-GB-Journey-D' //
				| 'en-GB-Neural2-B'
				| 'en-GB-Neural2-D'
				| 'en-GB-News-J'
				| 'en-GB-News-K'
				| 'en-GB-News-L'
				| 'en-GB-News-M'
				| 'en-GB-Standard-B'
				| 'en-GB-Standard-D'
				| 'en-GB-Studio-B'
				| 'en-GB-Wavenet-B'
				| 'en-GB-Wavenet-D';
	  }
	| {
			languageCode: 'en-GB';
			ssmlGender?: 'FEMALE';
			name?:
				| 'en-GB-Journey-F' //
				| 'en-GB-Neural2-A'
				| 'en-GB-Neural2-C'
				| 'en-GB-Neural2-F'
				| 'en-GB-News-G'
				| 'en-GB-News-H'
				| 'en-GB-News-I'
				| 'en-GB-Standard-A'
				| 'en-GB-Standard-C'
				| 'en-GB-Standard-F'
				| 'en-GB-Studio-C'
				| 'en-GB-Wavenet-A'
				| 'en-GB-Wavenet-C'
				| 'en-GB-Wavenet-F';
	  }
	| {
			languageCode: 'en-US';
			ssmlGender?: 'MALE';
			name?:
				| 'en-US-Casual-K' //
				| 'en-US-Journey-D'
				| 'en-US-Neural2-A'
				| 'en-US-Neural2-D'
				| 'en-US-Neural2-I'
				| 'en-US-Neural2-J'
				| 'en-US-News-N'
				| 'en-US-Polyglot-1'
				| 'en-US-Standard-A'
				| 'en-US-Standard-B'
				| 'en-US-Standard-D'
				| 'en-US-Standard-I'
				| 'en-US-Standard-J'
				| 'en-US-Studio-Q'
				| 'en-US-Wavenet-A'
				| 'en-US-Wavenet-B'
				| 'en-US-Wavenet-D'
				| 'en-US-Wavenet-I'
				| 'en-US-Wavenet-J';
	  }
	| {
			languageCode: 'en-US';
			ssmlGender?: 'FEMALE';
			name?:
				| 'en-US-Journey-F' //
				| 'en-US-Journey-O'
				| 'en-US-Neural2-C'
				| 'en-US-Neural2-E'
				| 'en-US-Neural2-F'
				| 'en-US-Neural2-G'
				| 'en-US-Neural2-H'
				| 'en-US-News-K'
				| 'en-US-News-L'
				| 'en-US-Standard-C'
				| 'en-US-Standard-E'
				| 'en-US-Standard-F'
				| 'en-US-Standard-G'
				| 'en-US-Standard-H'
				| 'en-US-Studio-O'
				| 'en-US-Wavenet-C'
				| 'en-US-Wavenet-E'
				| 'en-US-Wavenet-F'
				| 'en-US-Wavenet-G'
				| 'en-US-Wavenet-H';
	  }
	| {
			languageCode: 'fil-PH';
			ssmlGender?: 'MALE';
			name?:
				| 'fil-PH-Standard-C' //
				| 'fil-PH-Standard-D'
				| 'fil-PH-Wavenet-C'
				| 'fil-PH-Wavenet-D'
				| 'fil-ph-Neural2-D';
	  }
	| {
			languageCode: 'fil-PH';
			ssmlGender?: 'FEMALE';
			name?:
				| 'fil-PH-Standard-A' //
				| 'fil-PH-Standard-B'
				| 'fil-PH-Wavenet-A'
				| 'fil-PH-Wavenet-B'
				| 'fil-ph-Neural2-A';
	  }
	| {
			languageCode: 'fi-FI';
			ssmlGender?: 'FEMALE';
			name?:
				| 'fi-FI-Standard-A' //
				| 'fi-FI-Standard-B'
				| 'fi-FI-Wavenet-A';
	  }
	| {
			languageCode: 'fr-CA';
			ssmlGender?: 'MALE';
			name?:
				| 'fr-CA-Journey-D' //
				| 'fr-CA-Neural2-B'
				| 'fr-CA-Neural2-D'
				| 'fr-CA-Standard-B'
				| 'fr-CA-Standard-D'
				| 'fr-CA-Wavenet-B'
				| 'fr-CA-Wavenet-D';
	  }
	| {
			languageCode: 'fr-CA';
			ssmlGender?: 'FEMALE';
			name?:
				| 'fr-CA-Journey-F' //
				| 'fr-CA-Neural2-A'
				| 'fr-CA-Neural2-C'
				| 'fr-CA-Standard-A'
				| 'fr-CA-Standard-C'
				| 'fr-CA-Wavenet-A'
				| 'fr-CA-Wavenet-C';
	  }
	| {
			languageCode: 'fr-FR';
			ssmlGender?: 'MALE';
			name?:
				| 'fr-FR-Journey-D' //
				| 'fr-FR-Neural2-B'
				| 'fr-FR-Neural2-D'
				| 'fr-FR-Polyglot-1'
				| 'fr-FR-Standard-B'
				| 'fr-FR-Standard-D'
				| 'fr-FR-Standard-G'
				| 'fr-FR-Studio-D'
				| 'fr-FR-Wavenet-B'
				| 'fr-FR-Wavenet-D'
				| 'fr-FR-Wavenet-G';
	  }
	| {
			languageCode: 'fr-FR';
			ssmlGender?: 'FEMALE';
			name?:
				| 'fr-FR-Journey-F' //
				| 'fr-FR-Neural2-A'
				| 'fr-FR-Neural2-C'
				| 'fr-FR-Neural2-E'
				| 'fr-FR-Standard-A'
				| 'fr-FR-Standard-C'
				| 'fr-FR-Standard-E'
				| 'fr-FR-Standard-F'
				| 'fr-FR-Studio-A'
				| 'fr-FR-Wavenet-A'
				| 'fr-FR-Wavenet-C'
				| 'fr-FR-Wavenet-E'
				| 'fr-FR-Wavenet-F';
	  }
	| {
			languageCode: 'gl-ES';
			ssmlGender?: 'FEMALE';
			name?:
				| 'gl-ES-Standard-A' //
				| 'gl-ES-Standard-B';
	  }
	| {
			languageCode: 'de-DE';
			ssmlGender?: 'MALE';
			name?:
				| 'de-DE-Journey-D' //
				| 'de-DE-Neural2-B'
				| 'de-DE-Neural2-D'
				| 'de-DE-Polyglot-1'
				| 'de-DE-Standard-B'
				| 'de-DE-Standard-D'
				| 'de-DE-Standard-E'
				| 'de-DE-Standard-H'
				| 'de-DE-Studio-B'
				| 'de-DE-Wavenet-B'
				| 'de-DE-Wavenet-D'
				| 'de-DE-Wavenet-E'
				| 'de-DE-Wavenet-H';
	  }
	| {
			languageCode: 'de-DE';
			ssmlGender?: 'FEMALE';
			name?:
				| 'de-DE-Journey-F' //
				| 'de-DE-Neural2-A'
				| 'de-DE-Neural2-C'
				| 'de-DE-Neural2-F'
				| 'de-DE-Standard-A'
				| 'de-DE-Standard-C'
				| 'de-DE-Standard-F'
				| 'de-DE-Standard-G'
				| 'de-DE-Studio-C'
				| 'de-DE-Wavenet-A'
				| 'de-DE-Wavenet-C'
				| 'de-DE-Wavenet-F'
				| 'de-DE-Wavenet-G';
	  }
	| {
			languageCode: 'el-GR';
			ssmlGender?: 'FEMALE';
			name?:
				| 'el-GR-Standard-A' //
				| 'el-GR-Standard-B'
				| 'el-GR-Wavenet-A';
	  }
	| {
			languageCode: 'gu-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'gu-IN-Standard-B' //
				| 'gu-IN-Standard-D'
				| 'gu-IN-Wavenet-B'
				| 'gu-IN-Wavenet-D';
	  }
	| {
			languageCode: 'gu-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'gu-IN-Standard-A' //
				| 'gu-IN-Standard-C'
				| 'gu-IN-Wavenet-A'
				| 'gu-IN-Wavenet-C';
	  }
	| {
			languageCode: 'he-IL';
			ssmlGender?: 'MALE';
			name?:
				| 'he-IL-Standard-B' //
				| 'he-IL-Standard-D'
				| 'he-IL-Wavenet-B'
				| 'he-IL-Wavenet-D';
	  }
	| {
			languageCode: 'he-IL';
			ssmlGender?: 'FEMALE';
			name?:
				| 'he-IL-Standard-A' //
				| 'he-IL-Standard-C'
				| 'he-IL-Wavenet-A'
				| 'he-IL-Wavenet-C';
	  }
	| {
			languageCode: 'hi-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'hi-IN-Neural2-B' //
				| 'hi-IN-Neural2-C'
				| 'hi-IN-Standard-B'
				| 'hi-IN-Standard-C'
				| 'hi-IN-Standard-F'
				| 'hi-IN-Wavenet-B'
				| 'hi-IN-Wavenet-C'
				| 'hi-IN-Wavenet-F';
	  }
	| {
			languageCode: 'hi-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'hi-IN-Neural2-A' //
				| 'hi-IN-Neural2-D'
				| 'hi-IN-Standard-A'
				| 'hi-IN-Standard-D'
				| 'hi-IN-Standard-E'
				| 'hi-IN-Wavenet-A'
				| 'hi-IN-Wavenet-D'
				| 'hi-IN-Wavenet-E';
	  }
	| {
			languageCode: 'hu-HU';
			ssmlGender?: 'FEMALE';
			name?:
				| 'hu-HU-Standard-A' //
				| 'hu-HU-Standard-B'
				| 'hu-HU-Wavenet-A';
	  }
	| {
			languageCode: 'is-IS';
			ssmlGender?: 'FEMALE';
			name?:
				| 'is-IS-Standard-A' //
				| 'is-IS-Standard-B';
	  }
	| {
			languageCode: 'id-ID';
			ssmlGender?: 'MALE';
			name?:
				| 'id-ID-Standard-B' //
				| 'id-ID-Standard-C'
				| 'id-ID-Wavenet-B'
				| 'id-ID-Wavenet-C';
	  }
	| {
			languageCode: 'id-ID';
			ssmlGender?: 'FEMALE';
			name?:
				| 'id-ID-Standard-A' //
				| 'id-ID-Standard-D'
				| 'id-ID-Wavenet-A'
				| 'id-ID-Wavenet-D';
	  }
	| {
			languageCode: 'it-IT';
			ssmlGender?: 'MALE';
			name?:
				| 'it-IT-Journey-D' //
				| 'it-IT-Neural2-C'
				| 'it-IT-Standard-C'
				| 'it-IT-Standard-D'
				| 'it-IT-Wavenet-C'
				| 'it-IT-Wavenet-D';
	  }
	| {
			languageCode: 'it-IT';
			ssmlGender?: 'FEMALE';
			name?:
				| 'it-IT-Journey-F' //
				| 'it-IT-Neural2-A'
				| 'it-IT-Standard-A'
				| 'it-IT-Standard-B'
				| 'it-IT-Wavenet-A'
				| 'it-IT-Wavenet-B';
	  }
	| {
			languageCode: 'ja-JP';
			ssmlGender?: 'MALE';
			name?:
				| 'ja-JP-Neural2-C' //
				| 'ja-JP-Neural2-D'
				| 'ja-JP-Standard-C'
				| 'ja-JP-Standard-D'
				| 'ja-JP-Wavenet-C'
				| 'ja-JP-Wavenet-D';
	  }
	| {
			languageCode: 'ja-JP';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ja-JP-Neural2-B' //
				| 'ja-JP-Standard-A'
				| 'ja-JP-Standard-B'
				| 'ja-JP-Wavenet-A'
				| 'ja-JP-Wavenet-B';
	  }
	| {
			languageCode: 'kn-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'kn-IN-Standard-B' //
				| 'kn-IN-Standard-D'
				| 'kn-IN-Wavenet-B'
				| 'kn-IN-Wavenet-D';
	  }
	| {
			languageCode: 'kn-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'kn-IN-Standard-A' //
				| 'kn-IN-Standard-C'
				| 'kn-IN-Wavenet-A'
				| 'kn-IN-Wavenet-C';
	  }
	| {
			languageCode: 'ko-KR';
			ssmlGender?: 'MALE';
			name?:
				| 'ko-KR-Neural2-C' //
				| 'ko-KR-Standard-C'
				| 'ko-KR-Standard-D'
				| 'ko-KR-Wavenet-C'
				| 'ko-KR-Wavenet-D';
	  }
	| {
			languageCode: 'ko-KR';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ko-KR-Neural2-A' //
				| 'ko-KR-Neural2-B'
				| 'ko-KR-Standard-A'
				| 'ko-KR-Standard-B'
				| 'ko-KR-Wavenet-A'
				| 'ko-KR-Wavenet-B';
	  }
	| {
			languageCode: 'lv-LV';
			ssmlGender?: 'MALE';
			name?:
				| 'lv-LV-Standard-A' //
				| 'lv-LV-Standard-B';
	  }
	| {
			languageCode: 'lt-LT';
			ssmlGender?: 'MALE';
			name?: 'lt-LT-Standard-A';
	  }
	| {
			languageCode: 'ms-MY';
			ssmlGender?: 'MALE';
			name?:
				| 'ms-MY-Standard-B' //
				| 'ms-MY-Standard-D'
				| 'ms-MY-Wavenet-B'
				| 'ms-MY-Wavenet-D';
	  }
	| {
			languageCode: 'ms-MY';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ms-MY-Standard-A' //
				| 'ms-MY-Standard-C'
				| 'ms-MY-Wavenet-A'
				| 'ms-MY-Wavenet-C';
	  }
	| {
			languageCode: 'ml-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'ml-IN-Standard-B' //
				| 'ml-IN-Standard-D'
				| 'ml-IN-Wavenet-B'
				| 'ml-IN-Wavenet-D';
	  }
	| {
			languageCode: 'ml-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ml-IN-Standard-A' //
				| 'ml-IN-Standard-C'
				| 'ml-IN-Wavenet-A'
				| 'ml-IN-Wavenet-C';
	  }
	| {
			languageCode: 'cmn-CN';
			ssmlGender?: 'MALE';
			name?:
				| 'cmn-CN-Standard-B' //
				| 'cmn-CN-Standard-C'
				| 'cmn-CN-Wavenet-B'
				| 'cmn-CN-Wavenet-C';
	  }
	| {
			languageCode: 'cmn-CN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'cmn-CN-Standard-A' //
				| 'cmn-CN-Standard-D'
				| 'cmn-CN-Wavenet-A'
				| 'cmn-CN-Wavenet-D';
	  }
	| {
			languageCode: 'cmn-TW';
			ssmlGender?: 'MALE';
			name?:
				| 'cmn-TW-Standard-B' //
				| 'cmn-TW-Standard-C'
				| 'cmn-TW-Wavenet-B'
				| 'cmn-TW-Wavenet-C';
	  }
	| {
			languageCode: 'cmn-TW';
			ssmlGender?: 'FEMALE';
			name?:
				| 'cmn-TW-Standard-A' //
				| 'cmn-TW-Wavenet-A';
	  }
	| {
			languageCode: 'mr-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'mr-IN-Standard-B' //
				| 'mr-IN-Wavenet-B';
	  }
	| {
			languageCode: 'mr-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'mr-IN-Standard-A' //
				| 'mr-IN-Standard-C'
				| 'mr-IN-Wavenet-A'
				| 'mr-IN-Wavenet-C';
	  }
	| {
			languageCode: 'nb-NO';
			ssmlGender?: 'MALE';
			name?:
				| 'nb-NO-Standard-B' //
				| 'nb-NO-Standard-D'
				| 'nb-NO-Standard-G'
				| 'nb-NO-Wavenet-B'
				| 'nb-NO-Wavenet-D';
	  }
	| {
			languageCode: 'nb-NO';
			ssmlGender?: 'FEMALE';
			name?:
				| 'nb-NO-Standard-A' //
				| 'nb-NO-Standard-C'
				| 'nb-NO-Standard-E'
				| 'nb-NO-Standard-F'
				| 'nb-NO-Wavenet-A'
				| 'nb-NO-Wavenet-C'
				| 'nb-NO-Wavenet-E';
	  }
	| {
			languageCode: 'pl-PL';
			ssmlGender?: 'MALE';
			name?:
				| 'pl-PL-Standard-B' //
				| 'pl-PL-Standard-C'
				| 'pl-PL-Wavenet-B'
				| 'pl-PL-Wavenet-C';
	  }
	| {
			languageCode: 'pl-PL';
			ssmlGender?: 'FEMALE';
			name?:
				| 'pl-PL-Standard-A' //
				| 'pl-PL-Standard-D'
				| 'pl-PL-Standard-E'
				| 'pl-PL-Wavenet-A'
				| 'pl-PL-Wavenet-D'
				| 'pl-PL-Wavenet-E';
	  }
	| {
			languageCode: 'pt-BR';
			ssmlGender?: 'MALE';
			name?:
				| 'pt-BR-Neural2-B' //
				| 'pt-BR-Standard-B'
				| 'pt-BR-Standard-E'
				| 'pt-BR-Wavenet-B'
				| 'pt-BR-Wavenet-E';
	  }
	| {
			languageCode: 'pt-BR';
			ssmlGender?: 'FEMALE';
			name?:
				| 'pt-BR-Neural2-A' //
				| 'pt-BR-Neural2-C'
				| 'pt-BR-Standard-A'
				| 'pt-BR-Standard-C'
				| 'pt-BR-Standard-D'
				| 'pt-BR-Wavenet-A'
				| 'pt-BR-Wavenet-C'
				| 'pt-BR-Wavenet-D';
	  }
	| {
			languageCode: 'pt-PT';
			ssmlGender?: 'MALE';
			name?:
				| 'pt-PT-Standard-B' //
				| 'pt-PT-Standard-C'
				| 'pt-PT-Standard-F'
				| 'pt-PT-Wavenet-B'
				| 'pt-PT-Wavenet-C';
	  }
	| {
			languageCode: 'pt-PT';
			ssmlGender?: 'FEMALE';
			name?:
				| 'pt-PT-Standard-A' //
				| 'pt-PT-Standard-D'
				| 'pt-PT-Standard-E'
				| 'pt-PT-Wavenet-A'
				| 'pt-PT-Wavenet-D';
	  }
	| {
			languageCode: 'pa-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'pa-IN-Standard-B' //
				| 'pa-IN-Standard-D'
				| 'pa-IN-Wavenet-B'
				| 'pa-IN-Wavenet-D';
	  }
	| {
			languageCode: 'pa-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'pa-IN-Standard-A' //
				| 'pa-IN-Standard-C'
				| 'pa-IN-Wavenet-A'
				| 'pa-IN-Wavenet-C';
	  }
	| {
			languageCode: 'ro-RO';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ro-RO-Standard-A' //
				| 'ro-RO-Standard-B'
				| 'ro-RO-Wavenet-A';
	  }
	| {
			languageCode: 'ru-RU';
			ssmlGender?: 'MALE';
			name?:
				| 'ru-RU-Standard-B' //
				| 'ru-RU-Standard-D'
				| 'ru-RU-Wavenet-B'
				| 'ru-RU-Wavenet-D';
	  }
	| {
			languageCode: 'ru-RU';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ru-RU-Standard-A' //
				| 'ru-RU-Standard-C'
				| 'ru-RU-Standard-E'
				| 'ru-RU-Wavenet-A'
				| 'ru-RU-Wavenet-C'
				| 'ru-RU-Wavenet-E';
	  }
	| {
			languageCode: 'sr-RS';
			ssmlGender?: 'FEMALE';
			name?: 'sr-RS-Standard-A';
	  }
	| {
			languageCode: 'sk-SK';
			ssmlGender?: 'FEMALE';
			name?:
				| 'sk-SK-Standard-A' //
				| 'sk-SK-Standard-B'
				| 'sk-SK-Wavenet-A';
	  }
	| {
			languageCode: 'es-ES';
			ssmlGender?: 'MALE';
			name?:
				| 'es-ES-Neural2-B' //
				| 'es-ES-Neural2-F'
				| 'es-ES-Polyglot-1'
				| 'es-ES-Standard-B'
				| 'es-ES-Standard-E'
				| 'es-ES-Studio-F'
				| 'es-ES-Wavenet-B'
				| 'es-ES-Wavenet-E';
	  }
	| {
			languageCode: 'es-ES';
			ssmlGender?: 'FEMALE';
			name?:
				| 'es-ES-Neural2-A' //
				| 'es-ES-Neural2-C'
				| 'es-ES-Neural2-D'
				| 'es-ES-Neural2-E'
				| 'es-ES-Standard-A'
				| 'es-ES-Standard-C'
				| 'es-ES-Standard-D'
				| 'es-ES-Standard-F'
				| 'es-ES-Studio-C'
				| 'es-ES-Wavenet-C'
				| 'es-ES-Wavenet-D'
				| 'es-ES-Wavenet-F';
	  }
	| {
			languageCode: 'es-US';
			ssmlGender?: 'MALE';
			name?:
				| 'es-US-Journey-D' //
				| 'es-US-Neural2-B'
				| 'es-US-Neural2-C'
				| 'es-US-News-D'
				| 'es-US-News-E'
				| 'es-US-Polyglot-1'
				| 'es-US-Standard-B'
				| 'es-US-Standard-C'
				| 'es-US-Studio-B'
				| 'es-US-Wavenet-B'
				| 'es-US-Wavenet-C';
	  }
	| {
			languageCode: 'es-US';
			ssmlGender?: 'FEMALE';
			name?:
				| 'es-US-Journey-F' //
				| 'es-US-Neural2-A'
				| 'es-US-News-F'
				| 'es-US-News-G'
				| 'es-US-Standard-A'
				| 'es-US-Wavenet-A';
	  }
	| {
			languageCode: 'sv-SE';
			ssmlGender?: 'MALE';
			name?:
				| 'sv-SE-Standard-D' //
				| 'sv-SE-Standard-E'
				| 'sv-SE-Standard-G'
				| 'sv-SE-Wavenet-C'
				| 'sv-SE-Wavenet-E';
	  }
	| {
			languageCode: 'sv-SE';
			ssmlGender?: 'FEMALE';
			name?:
				| 'sv-SE-Standard-A' //
				| 'sv-SE-Standard-B'
				| 'sv-SE-Standard-C'
				| 'sv-SE-Standard-F'
				| 'sv-SE-Wavenet-A'
				| 'sv-SE-Wavenet-B'
				| 'sv-SE-Wavenet-D';
	  }
	| {
			languageCode: 'ta-IN';
			ssmlGender?: 'MALE';
			name?:
				| 'ta-IN-Standard-B' //
				| 'ta-IN-Standard-D'
				| 'ta-IN-Wavenet-B'
				| 'ta-IN-Wavenet-D';
	  }
	| {
			languageCode: 'ta-IN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'ta-IN-Standard-A' //
				| 'ta-IN-Standard-C'
				| 'ta-IN-Wavenet-A'
				| 'ta-IN-Wavenet-C';
	  }
	| {
			languageCode: 'te-IN';
			ssmlGender?: 'MALE';
			name?: 'te-IN-Standard-B';
	  }
	| {
			languageCode: 'te-IN';
			ssmlGender?: 'FEMALE';
			name?: 'te-IN-Standard-A';
	  }
	| {
			languageCode: 'th-TH';
			ssmlGender?: 'FEMALE';
			name?:
				| 'th-TH-Neural2-C' //
				| 'th-TH-Standard-A';
	  }
	| {
			languageCode: 'tr-TR';
			ssmlGender?: 'MALE';
			name?:
				| 'tr-TR-Standard-B' //
				| 'tr-TR-Standard-E'
				| 'tr-TR-Wavenet-B'
				| 'tr-TR-Wavenet-E';
	  }
	| {
			languageCode: 'tr-TR';
			ssmlGender?: 'FEMALE';
			name?:
				| 'tr-TR-Standard-A' //
				| 'tr-TR-Standard-C'
				| 'tr-TR-Standard-D'
				| 'tr-TR-Wavenet-A'
				| 'tr-TR-Wavenet-C'
				| 'tr-TR-Wavenet-D';
	  }
	| {
			languageCode: 'uk-UA';
			ssmlGender?: 'FEMALE';
			name?:
				| 'uk-UA-Standard-A' //
				| 'uk-UA-Wavenet-A';
	  }
	| {
			languageCode: 'vi-VN';
			ssmlGender?: 'MALE';
			name?:
				| 'vi-VN-Neural2-D' //
				| 'vi-VN-Standard-B'
				| 'vi-VN-Standard-D'
				| 'vi-VN-Wavenet-B'
				| 'vi-VN-Wavenet-D';
	  }
	| {
			languageCode: 'vi-VN';
			ssmlGender?: 'FEMALE';
			name?:
				| 'vi-VN-Neural2-A' //
				| 'vi-VN-Standard-A'
				| 'vi-VN-Standard-C'
				| 'vi-VN-Wavenet-A'
				| 'vi-VN-Wavenet-C';
	  };

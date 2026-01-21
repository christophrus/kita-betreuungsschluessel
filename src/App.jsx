import { useState } from 'react'

// Gesetzliche Betreuungsschlüssel (§12 Abs. 2)
const BETREUUNGSSCHLUESSEL = {
  krippe: 4.5014,      // 1 VZÄ für 4,5014 Kinder
  kindergarten: 10.5244, // 1 VZÄ für 10,5244 Kinder
  hort: 20.4730        // 1 VZÄ für 20,4730 Kinder
}

const VOLLZEIT_STUNDEN = 40 // 1 Vollzeitäquivalent = 40 Wochenstunden

function App() {
  const [einrichtungsart, setEinrichtungsart] = useState('kindergarten')
  const [wochenstunden, setWochenstunden] = useState('')
  const [anzahlKinder, setAnzahlKinder] = useState('')
  const [ergebnis, setErgebnis] = useState(null)

  const berechneBetreuungsschluessel = () => {
    const stunden = parseFloat(wochenstunden)
    const kinder = parseFloat(anzahlKinder)

    if (isNaN(stunden) || isNaN(kinder) || stunden <= 0 || kinder <= 0) {
      setErgebnis({ fehler: 'Bitte gültige Werte eingeben' })
      return
    }

    // Berechne Vollzeitäquivalente
    const vollzeitaequivalente = stunden / VOLLZEIT_STUNDEN

    // Gesetzlicher Schlüssel für gewählte Einrichtungsart
    const gesetzlicherSchluessel = BETREUUNGSSCHLUESSEL[einrichtungsart]

    // Maximale Kinderzahl bei gegebenen Stunden
    const maxKinder = vollzeitaequivalente * gesetzlicherSchluessel

    // Tatsächlicher Betreuungsschlüssel
    const tatsaecklicherSchluessel = kinder / vollzeitaequivalente

    // Benötigte Vollzeitäquivalente für die Kinderzahl
    const benoetigteVZAE = kinder / gesetzlicherSchluessel
    const benoetigteStunden = benoetigteVZAE * VOLLZEIT_STUNDEN

    // Prüfung ob Schlüssel eingehalten wird
    const eingehalten = tatsaecklicherSchluessel <= gesetzlicherSchluessel

    setErgebnis({
      eingehalten,
      vollzeitaequivalente: vollzeitaequivalente.toFixed(2),
      tatsaecklicherSchluessel: tatsaecklicherSchluessel.toFixed(4),
      gesetzlicherSchluessel: gesetzlicherSchluessel.toFixed(4),
      maxKinder: maxKinder.toFixed(2),
      differenz: (kinder - maxKinder).toFixed(2),
      benoetigteStunden: benoetigteStunden.toFixed(2),
      stundendifferenz: (benoetigteStunden - stunden).toFixed(2)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-3 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-1 sm:mb-2 leading-tight">
            Kita Betreuungs&shy;schlüssel-Rechner
          </h1>
          <p className="text-center text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            Überprüfung nach §12 SächsKitaG
          </p>

          {/* Einrichtungsart */}
          <div className="mb-5 sm:mb-6">
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
              Einrichtungsart
            </label>
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: 'krippe', label: 'Kinderkrippe', desc: '0-3 Jahre' },
                { value: 'kindergarten', label: 'Kindergarten', desc: '3-6 Jahre' },
                { value: 'hort', label: 'Hort', desc: 'Schulkinder' }
              ].map(({ value, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setEinrichtungsart(value)}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left sm:text-center ${
                    einrichtungsart === value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </button>
              ))}
            </div>
            <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded">
              Gesetzlicher Schlüssel: 1 VZÄ (40h) für {BETREUUNGSSCHLUESSEL[einrichtungsart]} Kinder
            </div>
          </div>

          {/* Eingabefelder */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Wochenstunden (gesamt)
              </label>
              <input
                type="number"
                step="0.1"
                value={wochenstunden}
                onChange={(e) => setWochenstunden(e.target.value)}
                placeholder="z.B. 90"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
              <p className="mt-1 text-xs text-gray-500">
                Summe aller Wochenstunden des pädagogischen Personals
              </p>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                Anzahl Kinder
              </label>
              <input
                type="number"
                step="0.5"
                value={anzahlKinder}
                onChange={(e) => setAnzahlKinder(e.target.value)}
                placeholder="z.B. 11.5"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
              <p className="mt-1 text-xs text-gray-500">
                Anzahl der zu betreuenden Kinder
              </p>
            </div>
          </div>

          {/* Berechnen Button */}
          <button
            onClick={berechneBetreuungsschluessel}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 sm:py-4 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
          >
            Betreuungsschlüssel berechnen
          </button>
        </div>

        {/* Ergebnis */}
        {ergebnis && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            {ergebnis.fehler ? (
              <div className="text-center text-red-600 font-semibold text-sm sm:text-base">
                {ergebnis.fehler}
              </div>
            ) : (
              <>
                <div className={`text-center p-4 sm:p-6 rounded-xl mb-4 sm:mb-6 ${
                  ergebnis.eingehalten 
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                }`}>
                  <div className="text-4xl sm:text-5xl mb-2">
                    {ergebnis.eingehalten ? '✅' : '❌'}
                  </div>
                  <div className={`text-lg sm:text-2xl font-bold ${
                    ergebnis.eingehalten ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {ergebnis.eingehalten 
                      ? 'Betreuungsschlüssel eingehalten'
                      : 'Betreuungsschlüssel NICHT eingehalten'
                    }
                  </div>
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Linke Spalte */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3">Ihre Angaben</h3>
                    
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-600">Wochenstunden</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{wochenstunden} h</div>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-600">Vollzeitäquivalente</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{ergebnis.vollzeitaequivalente} VZÄ</div>
                    </div>

                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                      <div className="text-xs sm:text-sm text-gray-600">Anzahl Kinder</div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-800">{anzahlKinder}</div>
                    </div>

                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                      <div className="text-xs sm:text-sm text-blue-700">Tatsächlicher Schlüssel</div>
                      <div className="text-xl sm:text-2xl font-bold text-blue-800">
                        1 VZÄ : {ergebnis.tatsaecklicherSchluessel} Kinder
                      </div>
                    </div>
                  </div>

                  {/* Rechte Spalte */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-2 sm:mb-3">Gesetzliche Vorgaben</h3>
                    
                    <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
                      <div className="text-xs sm:text-sm text-purple-700">Gesetzlicher Schlüssel</div>
                      <div className="text-xl sm:text-2xl font-bold text-purple-800">
                        1 VZÄ : {ergebnis.gesetzlicherSchluessel} Kinder
                      </div>
                    </div>

                    <div className={`p-3 sm:p-4 rounded-lg ${
                      ergebnis.eingehalten ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <div className="text-xs sm:text-sm text-gray-600">Max. Kinder bei {wochenstunden}h</div>
                      <div className={`text-xl sm:text-2xl font-bold ${
                        ergebnis.eingehalten ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {ergebnis.maxKinder} Kinder
                      </div>
                    </div>

                    <div className={`p-3 sm:p-4 rounded-lg ${
                      ergebnis.eingehalten ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {parseFloat(ergebnis.differenz) > 0 ? 'Kinder zu viel' : 'Puffer'}
                      </div>
                      <div className={`text-xl sm:text-2xl font-bold ${
                        ergebnis.eingehalten ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {ergebnis.differenz} Kinder
                      </div>
                    </div>

                    <div className={`p-3 sm:p-4 rounded-lg ${
                      ergebnis.eingehalten ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {parseFloat(ergebnis.stundendifferenz) > 0 ? 'Fehlende Stunden' : 'Stunden-Puffer'}
                      </div>
                      <div className={`text-xl sm:text-2xl font-bold ${
                        ergebnis.eingehalten ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {ergebnis.stundendifferenz} h/Woche
                      </div>
                    </div>
                  </div>
                </div>

                {!ergebnis.eingehalten && (
                  <div className="mt-4 sm:mt-6 bg-orange-50 border border-orange-200 p-3 sm:p-4 rounded-lg">
                    <div className="font-semibold text-orange-800 mb-2 text-sm sm:text-base">⚠️ Empfehlung</div>
                    <div className="text-xs sm:text-sm text-orange-700">
                      Für {anzahlKinder} Kinder werden mindestens <strong>{ergebnis.benoetigteStunden} Wochenstunden</strong> benötigt, 
                      um den gesetzlichen Betreuungsschlüssel einzuhalten.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Hinweis */}
        <div className="mt-4 sm:mt-6 text-center text-white text-xs sm:text-sm px-2">
          <p>Gesetzliche Grundlage: §12 SächsKitaG</p>
          <p className="mt-1 text-xs opacity-80">
            Hinweis: Mittelbare pädagogische Tätigkeiten und Leitungszeit werden in dieser Berechnung noch nicht berücksichtigt
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

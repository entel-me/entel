import {
  Flex,
  Heading,
  Link,
  UnorderedList,
  ListItem,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import Layout from "../components/layout"
import { Head, useQuery } from "blitz"
import checkIfUnreadMessage from "app/queries/checkIfUnreadMessages"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

function DatenschutzLoggedOut() {
  return (
    <Layout user={false}>
      <ImpressumContent />
    </Layout>
  )
}

function DatenschutzLoggedIn() {
  const [hasUnreadMessage] = useQuery(checkIfUnreadMessage, null, { refetchInterval: 5000 })
  return (
    <Layout user={true} hasUnreadMessage={hasUnreadMessage}>
      <ImpressumContent />
    </Layout>
  )
}

function ImpressumContent() {
  return (
    <Flex textAlign="left" direction="column" width="full" marginBottom="1rem">
      <Heading
        as="h2"
        fontFamily="Raleway"
        fontWeight="bolder"
        fontSize="4xl"
        textAlign="center"
        alignSelf="center"
        marginY="1rem"
      >
        Datenschutz
      </Heading>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem">
        Einleitung
      </Heading>
      <p>
        Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer
        personenbezogenen Daten (nachfolgend auch kurz als "Daten“ bezeichnet) wir zu welchen
        Zwecken und in welchem Umfang im Rahmen der Bereitstellung unserer Applikation verarbeiten.
      </p>
      <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
      <p>Stand: 8. April 2021</p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem">
        Inhaltsübersicht
      </Heading>{" "}
      <UnorderedList>
        <ListItem>
          <a href="#m1870">Einleitung</a>
        </ListItem>
        <ListItem>
          <a href="#m3">Verantwortlicher</a>
        </ListItem>
        <ListItem>
          <a href="#mOverview">Übersicht der Verarbeitungen</a>
        </ListItem>
        <ListItem>
          <a href="#m13">Maßgebliche Rechtsgrundlagen</a>
        </ListItem>
        <ListItem>
          <a href="#m27">Sicherheitsmaßnahmen</a>
        </ListItem>
        <ListItem>
          <a href="#m25">Übermittlung von personenbezogenen Daten</a>
        </ListItem>
        <ListItem>
          <a href="#m24">Datenverarbeitung in Drittländern</a>
        </ListItem>
        <ListItem>
          <a href="#m225">Bereitstellung des Onlineangebotes und Webhosting</a>
        </ListItem>
        <ListItem>
          <a href="#m182">Kontaktaufnahme</a>
        </ListItem>
        <ListItem>
          <a href="#m406">Chatbots und Chatfunktionen</a>
        </ListItem>
        <ListItem>
          <a href="#m17">Newsletter und elektronische Benachrichtigungen</a>
        </ListItem>
        <ListItem>
          <a href="#m136">Präsenzen in sozialen Netzwerken (Social Media)</a>
        </ListItem>
        <ListItem>
          <a href="#m12">Löschung von Daten</a>
        </ListItem>
        <ListItem>
          <a href="#m15">Änderung und Aktualisierung der Datenschutzerklärung</a>
        </ListItem>
        <ListItem>
          <a href="#m10">Rechte der betroffenen Personen</a>
        </ListItem>
        <ListItem>
          <a href="#m42">Begriffsdefinitionen</a>
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m3">
        Verantwortlicher
      </Heading>
      <p>
        Till Bergmann
        <br />
        Stahnsdorferstraße 146B
        <br />
        14482 Potsdam
        <br />
        Germany
      </p>
      <p>E-Mail-Adresse: till.bergmann@uni-potsdam.de.</p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="mOverview">
        Übersicht der Verarbeitungen
      </Heading>
      <p>
        Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer
        Verarbeitung zusammen und verweist auf die betroffenen Personen.
      </p>
      <Heading as="h3" fontSize="lg" marginTop="0.7rem" marginBottom="0.3rem">
        Arten der verarbeiteten Daten
      </Heading>
      <UnorderedList>
        <ListItem>Bestandsdaten (z.B. Namen, Adressen).</ListItem>
        <ListItem>Inhaltsdaten (z.B. Eingaben in Onlineformularen).</ListItem>
        <ListItem>Kontaktdaten (z.B. E-Mail, Telefonnummern).</ListItem>
        <ListItem>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).</ListItem>
        <ListItem>
          Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="lg" marginTop="0.7rem" marginBottom="0.3rem">
        Kategorien betroffener Personen
      </Heading>
      <UnorderedList>
        <ListItem>Kommunikationspartner.</ListItem>
        <ListItem>Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).</ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="lg" marginTop="0.7rem" marginBottom="0.3rem">
        Zwecke der Verarbeitung
      </Heading>
      <UnorderedList>
        <ListItem>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</ListItem>
        <ListItem>Direktmarketing (z.B. per E-Mail oder postalisch).</ListItem>
        <ListItem>Feedback (z.B. Sammeln von Feedback via Online-Formular).</ListItem>
        <ListItem>Marketing.</ListItem>
        <ListItem>Kontaktanfragen und Kommunikation.</ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="lg" marginTop="0.7rem" marginBottom="0.3rem" id="m13">
        Maßgebliche Rechtsgrundlagen
      </Heading>
      <p>
        Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir
        personenbezogenen Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den
        Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland
        gelten können. Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein,
        teilen wir Ihnen diese in der Datenschutzerklärung mit.
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a. DSGVO)</strong> - Die betroffene Person
          hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen Daten für
          einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
        </ListItem>
        <ListItem>
          <strong>
            Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1 S. 1 lit. b. DSGVO)
          </strong>{" "}
          - Die Verarbeitung ist für die Erfüllung eines Vertrags, dessen Vertragspartei die
          betroffene Person ist, oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die
          auf Anfrage der betroffenen Person erfolgen.
        </ListItem>
        <ListItem>
          <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO)</strong> - Die
          Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines
          Dritten erforderlich, sofern nicht die Interessen oder Grundrechte und Grundfreiheiten der
          betroffenen Person, die den Schutz personenbezogener Daten erfordern, überwiegen.
        </ListItem>
      </UnorderedList>
      <p>
        <strong>Nationale Datenschutzregelungen in Deutschland</strong>: Zusätzlich zu den
        Datenschutzregelungen der Datenschutz-Grundverordnung gelten nationale Regelungen zum
        Datenschutz in Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch
        personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG
        enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum
        Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur
        Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten
        Entscheidungsfindung im Einzelfall einschließlich Profiling. Des Weiteren regelt es die
        Datenverarbeitung für Zwecke des Beschäftigungsverhältnisses (§ 26 BDSG), insbesondere im
        Hinblick auf die Begründung, Durchführung oder Beendigung von Beschäftigungsverhältnissen
        sowie die Einwilligung von Beschäftigten. Ferner können Landesdatenschutzgesetze der
        einzelnen Bundesländer zur Anwendung gelangen.
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m27">
        Sicherheitsmaßnahmen
      </Heading>
      <p>
        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der
        Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke
        der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes
        der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und
        organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
      </p>
      <p>
        Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und
        Verfügbarkeit von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den
        Daten als auch des sie betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der
        Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine
        Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung
        der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten
        bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend
        dem Prinzip des Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche
        Voreinstellungen.
      </p>
      <p>
        <strong>SSL-Verschlüsselung (https)</strong>: Um Ihre via unser Online-Angebot übermittelten
        Daten zu schützen, nutzen wir eine SSL-Verschlüsselung. Sie erkennen derart verschlüsselte
        Verbindungen an dem Präfix https:// in der Adresszeile Ihres Browsers.
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m25">
        Übermittlung von personenbezogenen Daten
      </Heading>
      <p>
        Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass die Daten an
        andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder Personen
        übermittelt oder sie ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten
        können z.B. mit IT-Aufgaben beauftragte Dienstleister oder Anbieter von Diensten und
        Inhalten, die in eine Webseite eingebunden werden, gehören. In solchen Fall beachten wir die
        gesetzlichen Vorgaben und schließen insbesondere entsprechende Verträge bzw. Vereinbarungen,
        die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m24">
        Datenverarbeitung in Drittländern
      </Heading>
      <p>
        Sofern wir Daten in einem Drittland (d.h., außerhalb der Europäischen Union (EU), des
        Europäischen Wirtschaftsraums (EWR)) verarbeiten oder die Verarbeitung im Rahmen der
        Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an
        andere Personen, Stellen oder Unternehmen stattfindet, erfolgt dies nur im Einklang mit den
        gesetzlichen Vorgaben.{" "}
      </p>
      <p>
        Vorbehaltlich ausdrücklicher Einwilligung oder vertraglich oder gesetzlich erforderlicher
        Übermittlung verarbeiten oder lassen wir die Daten nur in Drittländern mit einem anerkannten
        Datenschutzniveau, vertraglichen Verpflichtung durch sogenannte Standardschutzklauseln der
        EU-Kommission, beim Vorliegen von Zertifizierungen oder verbindlicher internen
        Datenschutzvorschriften verarbeiten (Art. 44 bis 49 DSGVO, Informationsseite der
        EU-Kommission:{" "}
        <a
          href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de"
          target="_blank"
        >
          https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection_de
        </a>
        ).
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m225">
        Bereitstellung des Onlineangebotes und Webhosting
      </Heading>
      <p>
        Um unser Onlineangebot sicher und effizient bereitstellen zu können, nehmen wir die
        Leistungen von einem oder mehreren Webhosting-Anbietern in Anspruch, von deren Servern (bzw.
        von ihnen verwalteten Servern) das Onlineangebot abgerufen werden kann. Zu diesen Zwecken
        können wir Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz und
        Datenbankdienste sowie Sicherheitsleistungen und technische Wartungsleistungen in Anspruch
        nehmen.
      </p>
      <p>
        Zu den im Rahmen der Bereitstellung des Hostingangebotes verarbeiteten Daten können alle die
        Nutzer unseres Onlineangebotes betreffenden Angaben gehören, die im Rahmen der Nutzung und
        der Kommunikation anfallen. Hierzu gehören regelmäßig die IP-Adresse, die notwendig ist, um
        die Inhalte von Onlineangeboten an Browser ausliefern zu können, und alle innerhalb unseres
        Onlineangebotes oder von Webseiten getätigten Eingaben.
      </p>
      <p>
        <strong>E-Mail-Versand und -Hosting</strong>: Die von uns in Anspruch genommenen
        Webhosting-Leistungen umfassen ebenfalls den Versand, den Empfang sowie die Speicherung von
        E-Mails. Zu diesen Zwecken werden die Adressen der Empfänger sowie Absender als auch weitere
        Informationen betreffend den E-Mailversand (z.B. die beteiligten Provider) sowie die Inhalte
        der jeweiligen E-Mails verarbeitet. Die vorgenannten Daten können ferner zu Zwecken der
        Erkennung von SPAM verarbeitet werden. Wir bitten darum, zu beachten, dass E-Mails im
        Internet grundsätzlich nicht verschlüsselt versendet werden. Im Regelfall werden E-Mails
        zwar auf dem Transportweg verschlüsselt, aber (sofern kein sogenanntes
        Ende-zu-Ende-Verschlüsselungsverfahren eingesetzt wird) nicht auf den Servern, von denen sie
        abgesendet und empfangen werden. Wir können daher für den Übertragungsweg der E-Mails
        zwischen dem Absender und dem Empfang auf unserem Server keine Verantwortung übernehmen.
      </p>
      <p>
        <strong>Erhebung von Zugriffsdaten und Logfiles</strong>: Wir selbst (bzw. unser
        Webhostinganbieter) erheben Daten zu jedem Zugriff auf den Server (sogenannte
        Serverlogfiles). Zu den Serverlogfiles können die Adresse und Name der abgerufenen Webseiten
        und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über
        erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL
        (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören.
      </p>
      <p>
        Die Serverlogfiles können zum einen zu Zwecken der Sicherheit eingesetzt werden, z.B., um
        eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen
        Angriffen, sogenannten DDoS-Attacken) und zum anderen, um die Auslastung der Server und ihre
        Stabilität sicherzustellen.
      </p>
      <p>
        <strong>Eingesetzte Dienste und Diensteanbieter:</strong> Heroku: Leistungen auf dem Gebiet
        der Bereitstellung von informationstechnischer Infrastruktur und verbundenen
        Dienstleistungen (z.B. Speicherplatz und/oder Rechenkapazitäten); Dienstanbieter: webgo
        GmbH, 415 Mission Street Suite 300 San Francisco, CA 94105 ; Website:{" "}
        <a href="https://www.heroku.com/" target="_blank">
          https://www.heroku.com/
        </a>
        ; Datenschutzerklärung:{" "}
        <a href="https://www.salesforce.com/company/privacy/" target="_blank">
          https://www.salesforce.com/company/privacy/
        </a>
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (z.B. Eingaben in
          Onlineformularen), Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten,
          Zugriffszeiten), Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).
        </ListItem>
        <ListItem>
          <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
          Onlinediensten).
        </ListItem>
        <ListItem>
          <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und
          Nutzerfreundlichkeit.
        </ListItem>
        <ListItem>
          <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f.
          DSGVO).
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m182">
        Kontaktaufnahme
      </Heading>
      <p>
        Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via soziale
        Medien) werden die Angaben der anfragenden Personen verarbeitet, soweit dies zur
        Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.
      </p>
      <p>
        Die Beantwortung der Kontaktanfragen im Rahmen von vertraglichen oder vorvertraglichen
        Beziehungen erfolgt zur Erfüllung unserer vertraglichen Pflichten oder zur Beantwortung von
        (vor)vertraglichen Anfragen und im Übrigen auf Grundlage der berechtigten Interessen an der
        Beantwortung der Anfragen.
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
          Kontaktdaten (z.B. E-Mail, Telefonnummern), Inhaltsdaten (z.B. Eingaben in
          Onlineformularen).
        </ListItem>
        <ListItem>
          <strong>Betroffene Personen:</strong> Kommunikationspartner.
        </ListItem>
        <ListItem>
          <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation.
        </ListItem>
        <ListItem>
          <strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6
          Abs. 1 S. 1 lit. b. DSGVO), Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m406">
        Chatbots und Chatfunktionen
      </Heading>
      <p>
        Wir bieten als Kommunikationsmöglichkeit Online-Chats und Chatbot-Funktionen an (zusammen
        als "Chat-Dienste" bezeichnet). Bei einem Chat handelt es sich um eine mit gewisser Zeitnähe
        geführte Online-Unterhaltung. Bei einem Chatbot handelt es sich um eine Software, die Fragen
        der Nutzer beantwortet oder sie über Nachrichten informiert. Wenn Sie unsere Chat-Funktionen
        nutzen, können wir Ihre personenbezogenen Daten verarbeiten.
      </p>
      <p>
        Falls Sie unsere Chat-Dienste innerhalb einer Online-Plattform nutzen, wird zusätzlich Ihre
        Identifikationsnummer innerhalb der jeweiligen Plattform gespeichert. Wir können zudem
        Informationen darüber erheben, welche Nutzer wann mit unseren Chat-Diensten interagieren.
        Ferner speichern wir den Inhalt Ihrer Konversationen über die Chat-Dienste und
        protokollieren Registrierungs- und Einwilligungsvorgänge, um diese nach gesetzlichen
        Vorgaben nachweisen zu können.{" "}
      </p>
      <p>
        Wir weisen Nutzer darauf hin, dass der jeweilige Plattformanbieter in Erfahrung bringen
        kann, dass und wann Nutzer mit unseren Chat-Diensten kommunizieren sowie technische
        Informationen zum verwendeten Gerät der Nutzer und je nach Einstellungen ihres Gerätes auch
        Standortinformationen (sogenannte Metadaten) zu Zwecken der Optimierung der jeweiligen
        Dienste und Zwecken der Sicherheit erheben kann. Ebenfalls könnten die Metadaten der
        Kommunikation via Chat-Diensten (d.h. z.B., die Information, wer mit wem kommuniziert hat)
        durch die jeweiligen Plattformanbieter nach Maßgabe ihrer Bestimmungen, auf die wir zwecks
        weiterer Information verweisen, für Zwecke des Marketings oder zur Anzeige auf Nutzer
        zugeschnittener Werbung verwendet werden.
      </p>
      <p>
        Sofern Nutzer sich gegenüber einem Chatbot bereiterklären, Informationen mit regelmäßigen
        Nachrichten zu aktivieren, steht ihnen jederzeit die Möglichkeit zur Verfügung, die
        Informationen für die Zukunft abzubestellen. Der Chatbot weist Nutzer darauf hin, wie und
        mit welchen Begriffen sie die Nachrichten abbestellen können. Mit dem Abbestellen der
        Chatbotnachrichten werden Daten der Nutzer aus dem Verzeichnis der Nachrichtenempfänger
        gelöscht.
      </p>
      <p>
        Die vorgenannten Angaben nutzen wir, um unsere Chat-Dienste zu betreiben, z.B., um Nutzer
        persönlich anzusprechen, um ihre Anfragen zu beantworten, etwaige angeforderte Inhalte zu
        übermitteln und auch, um unsere Chat-Dienste zu verbessern (z.B., um Chatbots Antworten auf
        häufig gestellte Fragen "beizubringen“ oder unbeantwortete Anfragen zu erkennen).
      </p>
      <p>
        <strong>Hinweise zu Rechtsgrundlagen:</strong> Wir setzen die Chat-Dienste auf Grundlage
        einer Einwilligung ein, wenn wir zuvor eine Erlaubnis der Nutzer in die Verarbeitung ihrer
        Daten im Rahmen unserer Chat-Dienste eingeholt haben (dies gilt für die Fälle, in denen
        Nutzer um eine Einwilligung gebeten werden, z.B., damit ein Chatbot ihnen regelmäßig
        Nachrichten zusendet). Sofern wir Chat-Dienste einsetzen, um Anfragen der Nutzer zu unseren
        Leistungen oder unserem Unternehmen zu beantworten, erfolgt dies zur vertraglichen und
        vorvertraglichen Kommunikation. Im Übrigen setzen wir Chat-Dienste auf Grundlage unserer
        berechtigten Interessen an einer Optimierung der Chat-Dienste, ihrer
        Betriebswirtschaftlichkeit sowie einer Steigerung der positiven Nutzererfahrung ein.
      </p>
      <p>
        <strong>Widerruf, Widerspruch und Löschung: </strong>Sie können jederzeit eine erteilte
        Einwilligung widerrufen oder der Verarbeitung Ihrer Daten im Rahmen unserer Chat-Dienste
        widersprechen.
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z.B. E-Mail, Telefonnummern),
          Inhaltsdaten (z.B. Eingaben in Onlineformularen), Nutzungsdaten (z.B. besuchte Webseiten,
          Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B.
          Geräte-Informationen, IP-Adressen).
        </ListItem>
        <ListItem>
          <strong>Betroffene Personen:</strong> Kommunikationspartner.
        </ListItem>
        <ListItem>
          <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation,
          Direktmarketing (z.B. per E-Mail oder postalisch).
        </ListItem>
        <ListItem>
          <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a. DSGVO),
          Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m17">
        Newsletter und elektronische Benachrichtigungen
      </Heading>
      <p>
        Wir versenden Newsletter, E-Mails und weitere elektronische Benachrichtigungen (nachfolgend
        "Newsletter“) nur mit der Einwilligung der Empfänger oder einer gesetzlichen Erlaubnis.
        Sofern im Rahmen einer Anmeldung zum Newsletter dessen Inhalte konkret umschrieben werden,
        sind sie für die Einwilligung der Nutzer maßgeblich. Im Übrigen enthalten unsere Newsletter
        Informationen zu unseren Leistungen und uns.
      </p>
      <p>
        Um sich zu unseren Newslettern anzumelden, reicht es grundsätzlich aus, wenn Sie Ihre
        E-Mail-Adresse angeben. Wir können Sie jedoch bitten, einen Namen, zwecks persönlicher
        Ansprache im Newsletter, oder weitere Angaben, sofern diese für die Zwecke des Newsletters
        erforderlich sind, zu tätigen.
      </p>
      <p>
        <strong>Double-Opt-In-Verfahren:</strong> Die Anmeldung zu unserem Newsletter erfolgt
        grundsätzlich in einem sogenannte Double-Opt-In-Verfahren. D.h., Sie erhalten nach der
        Anmeldung eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung gebeten werden. Diese
        Bestätigung ist notwendig, damit sich niemand mit fremden E-Mail-Adressen anmelden kann. Die
        Anmeldungen zum Newsletter werden protokolliert, um den Anmeldeprozess entsprechend den
        rechtlichen Anforderungen nachweisen zu können. Hierzu gehört die Speicherung des Anmelde-
        und des Bestätigungszeitpunkts als auch der IP-Adresse. Ebenso werden die Änderungen Ihrer
        bei dem Versanddienstleister gespeicherten Daten protokolliert.
      </p>
      <p>
        <strong>Löschung und Einschränkung der Verarbeitung: </strong> Wir können die ausgetragenen
        E-Mail-Adressen bis zu drei Jahren auf Grundlage unserer berechtigten Interessen speichern,
        bevor wir sie löschen, um eine ehemals gegebene Einwilligung nachweisen zu können. Die
        Verarbeitung dieser Daten wird auf den Zweck einer möglichen Abwehr von Ansprüchen
        beschränkt. Ein individueller Löschungsantrag ist jederzeit möglich, sofern zugleich das
        ehemalige Bestehen einer Einwilligung bestätigt wird. Im Fall von Pflichten zur dauerhaften
        Beachtung von Widersprüchen behalten wir uns die Speicherung der E-Mail-Adresse alleine zu
        diesem Zweck in einer Sperrliste (sogenannte "Blocklist") vor.
      </p>
      <p>
        Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer berechtigten
        Interessen zu Zwecken des Nachweises seines ordnungsgemäßen Ablaufs. Soweit wir einen
        Dienstleister mit dem Versand von E-Mails beauftragen, erfolgt dies auf Grundlage unserer
        berechtigten Interessen an einem effizienten und sicheren Versandsystem.
      </p>
      <p>
        <strong>Hinweise zu Rechtsgrundlagen:</strong> Der Versand der Newsletter erfolgt auf
        Grundlage einer Einwilligung der Empfänger oder, falls eine Einwilligung nicht erforderlich
        ist, auf Grundlage unserer berechtigten Interessen am Direktmarketing, sofern und soweit
        diese gesetzlich, z.B. im Fall von Bestandskundenwerbung, erlaubt ist. Soweit wir einen
        Dienstleister mit dem Versand von E-Mails beauftragen, geschieht dies auf der Grundlage
        unserer berechtigten Interessen. Das Registrierungsverfahren wird auf der Grundlage unserer
        berechtigten Interessen aufgezeichnet, um nachzuweisen, dass es in Übereinstimmung mit dem
        Gesetz durchgeführt wurde.
      </p>
      <p>Inhalte: Informationen zu uns, unseren Leistungen, Aktionen und Angeboten.</p>
      <p>Eingesetzte Dienste und Diensteanbieter:</p>
      <p>
        Nodemailer: E-Mail-Sender-Plattform; Dienstanbieter: CA Customer Alliance GmbH, Ullsteinstr.
        130 l Turm B, 12109 Berlin, Deutschland; Website:{" "}
        <a href="https://www.customer-alliance.com/de" target="_blank">
          https://www.customer-alliance.com/de
        </a>
        ; Datenschutzerklärung:{" "}
        <a href="https://www.customer-alliance.com/de/datenschutzbestimmungen/" target="_blank">
          https://www.customer-alliance.com/de/datenschutzbestimmungen/
        </a>
        .
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen),
          Kontaktdaten (z.B. E-Mail, Telefonnummern), Meta-/Kommunikationsdaten (z.B.
          Geräte-Informationen, IP-Adressen).
        </ListItem>
        <ListItem>
          <strong>Betroffene Personen:</strong> Kommunikationspartner.
        </ListItem>
        <ListItem>
          <strong>Zwecke der Verarbeitung:</strong> Direktmarketing (z.B. per E-Mail oder
          postalisch).
        </ListItem>
        <ListItem>
          <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a. DSGVO),
          Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
        </ListItem>
        <ListItem>
          <strong>Widerspruchsmöglichkeit (Opt-Out):</strong> Sie können den Empfang unseres
          Newsletters jederzeit kündigen, d.h. Ihre Einwilligungen widerrufen, bzw. dem weiteren
          Empfang widersprechen. Einen Link zur Kündigung des Newsletters finden Sie entweder am
          Ende eines jeden Newsletters oder können sonst eine der oben angegebenen
          Kontaktmöglichkeiten, vorzugswürdig E-Mail, hierzu nutzen.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m136">
        Präsenzen in sozialen Netzwerken (Social Media)
      </Heading>
      <p>
        Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem
        Rahmen Daten der Nutzer, um mit den dort aktiven Nutzern zu kommunizieren oder um
        Informationen über uns anzubieten.
      </p>
      <p>
        Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes der Europäischen
        Union verarbeitet werden können. Hierdurch können sich für die Nutzer Risiken ergeben, weil
        so z.B. die Durchsetzung der Rechte der Nutzer erschwert werden könnte.
      </p>
      <p>
        Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für
        Marktforschungs- und Werbezwecke verarbeitet. So können z.B. anhand des Nutzungsverhaltens
        und sich daraus ergebender Interessen der Nutzer Nutzungsprofile erstellt werden. Die
        Nutzungsprofile können wiederum verwendet werden, um z.B. Werbeanzeigen innerhalb und
        außerhalb der Netzwerke zu schalten, die mutmaßlich den Interessen der Nutzer entsprechen.
        Zu diesen Zwecken werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in
        denen das Nutzungsverhalten und die Interessen der Nutzer gespeichert werden. Ferner können
        in den Nutzungsprofilen auch Daten unabhängig der von den Nutzern verwendeten Geräte
        gespeichert werden (insbesondere, wenn die Nutzer Mitglieder der jeweiligen Plattformen sind
        und bei diesen eingeloggt sind).
      </p>
      <p>
        Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und der
        Widerspruchsmöglichkeiten (Opt-Out) verweisen wir auf die Datenschutzerklärungen und Angaben
        der Betreiber der jeweiligen Netzwerke.
      </p>
      <p>
        Auch im Fall von Auskunftsanfragen und der Geltendmachung von Betroffenenrechten weisen wir
        darauf hin, dass diese am effektivsten bei den Anbietern geltend gemacht werden können. Nur
        die Anbieter haben jeweils Zugriff auf die Daten der Nutzer und können direkt entsprechende
        Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann können
        Sie sich an uns wenden.
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Verarbeitete Datenarten:</strong> Kontaktdaten (z.B. E-Mail, Telefonnummern),
          Inhaltsdaten (z.B. Eingaben in Onlineformularen), Nutzungsdaten (z.B. besuchte Webseiten,
          Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B.
          Geräte-Informationen, IP-Adressen).
        </ListItem>
        <ListItem>
          <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
          Onlinediensten).
        </ListItem>
        <ListItem>
          <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation, Feedback
          (z.B. Sammeln von Feedback via Online-Formular), Marketing.
        </ListItem>
        <ListItem>
          <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f.
          DSGVO).
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m12">
        Löschung von Daten
      </Heading>
      <p>
        Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht,
        sobald deren zur Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige
        Erlaubnisse entfallen (z.B., wenn der Zweck der Verarbeitung dieser Daten entfallen ist oder
        sie für den Zweck nicht erforderlich sind).
      </p>
      <p>
        Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke
        erforderlich sind, wird deren Verarbeitung auf diese Zwecke beschränkt. D.h., die Daten
        werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus
        handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung zur
        Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte
        einer anderen natürlichen oder juristischen Person erforderlich ist.
      </p>
      <p>
        Unsere Datenschutzhinweise können ferner weitere Angaben zu der Aufbewahrung und Löschung
        von Daten beinhalten, die für die jeweiligen Verarbeitungen vorrangig gelten.
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m15">
        Änderung und Aktualisierung der Datenschutzerklärung
      </Heading>
      <p>
        Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren.
        Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten
        Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die
        Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige
        individuelle Benachrichtigung erforderlich wird.
      </p>
      <p>
        Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von Unternehmen
        und Organisationen angeben, bitten wir zu beachten, dass die Adressen sich über die Zeit
        ändern können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
      </p>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m10">
        Rechte der betroffenen Personen
      </Heading>
      <p>
        Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus
        Art. 15 bis 21 DSGVO ergeben:
      </p>
      <UnorderedList>
        <ListItem>
          <strong>
            Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
            Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden
            personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
            Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes
            Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um
            Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
            Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung
            einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
            Verbindung steht.
          </strong>
        </ListItem>
        <ListItem>
          <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte
          Einwilligungen jederzeit zu widerrufen.
        </ListItem>
        <ListItem>
          <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu
          verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie
          auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
        </ListItem>
        <ListItem>
          <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben
          das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie
          betreffenden unrichtigen Daten zu verlangen.
        </ListItem>
        <ListItem>
          <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach
          Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten
          unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine
          Einschränkung der Verarbeitung der Daten zu verlangen.
        </ListItem>
        <ListItem>
          <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende
          Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem
          strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung
          an einen anderen Verantwortlichen zu fordern.
        </ListItem>
        <ListItem>
          <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines
          anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf
          Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres
          gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden
          personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.
        </ListItem>
      </UnorderedList>
      <Heading as="h3" fontSize="2xl" marginTop="1.5rem" marginBottom="0.5rem" id="m42">
        Begriffsdefinitionen
      </Heading>
      <p>
        In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung
        verwendeten Begrifflichkeiten. Viele der Begriffe sind dem Gesetz entnommen und vor allem im
        Art. 4 DSGVO definiert. Die gesetzlichen Definitionen sind verbindlich. Die nachfolgenden
        Erläuterungen sollen dagegen vor allem dem Verständnis dienen. Die Begriffe sind
        alphabetisch sortiert.
      </p>
      <UnorderedList>
        <ListItem>
          <strong>Personenbezogene Daten:</strong> "Personenbezogene Daten“ sind alle Informationen,
          die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden
          "betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen,
          die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen,
          zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem
          oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen,
          physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen
          Identität dieser natürlichen Person sind.{" "}
        </ListItem>
        <ListItem>
          <strong>Verantwortlicher:</strong> Als "Verantwortlicher“ wird die natürliche oder
          juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit
          anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
          entscheidet, bezeichnet.{" "}
        </ListItem>
        <ListItem>
          <strong>Verarbeitung:</strong> "Verarbeitung" ist jeder mit oder ohne Hilfe
          automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im
          Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch
          jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern, das Übermitteln
          oder das Löschen.{" "}
        </ListItem>
      </UnorderedList>
      <p>
        <Link
          href="https://datenschutz-generator.de/?l=de"
          title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
        </Link>
      </p>
    </Flex>
  )
}
export default function Datenschutz() {
  const user = useCurrentUser()
  return (
    <>
      <Head>
        <title>entel | Datenschutz</title>
      </Head>
      {user ? <DatenschutzLoggedIn /> : <DatenschutzLoggedOut />}
    </>
  )
}

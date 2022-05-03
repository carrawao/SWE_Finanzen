import React from 'react';
import {Typography, Container, List, ListItem} from '@mui/material';

const Privacy = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='70%'
    />

    <Typography variant='h2' className='pt-4 ps-3 fw-bold'>
      Datenschutzerklärung
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      1. Grundlegendes
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Mit dieser Datenschutzerklärung informieren wir Sie über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Websitebetreiber [Ihre Kontaktdaten einfügen].
      </p>
      <p>
        Der Websitebetreiber nimmt Ihren Datenschutz sehr ernst und behandelt Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Vorschriften. Da durch neue Technologien und die ständige Weiterentwicklung dieser Webseite änderungen an dieser Datenschutzerklärung vorgenommen werden können, empfehlen wir Ihnen sich die Datenschutzerklärung in regelmä&szlig;igen Abständen wieder durchzulesen.
      </p>
      <p>
        Der Begriff "personenbezogene Daten" meint alle Daten, die auf Sie persönlich beziehbar sind. Darunter fallen beispielsweise Name, Adresse, E-Mailadressen, Nutzerverhalten. Hinsichtlich der übrigen Begrifflichkeiten, insbesondere der Begriffe "Verarbeitung" und "Einwilligung" verweisen wir auf die gesetzlichen datenschutzrechtlichen Definitionen.
      </p>
      <p>
        Weitere Definitionen von Begriffen finden Sie in Art. 4 DSGVO.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      2. Name und Anschrift des Verantwortlichen
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen ist die:
      </p>
      <p>
        Bench:Market
      </p>
      <p>
        Postanschrift:<br/>
        Musterweg <br/>
        12345 Musterstadt
      </p>
      <p>
        Kontakt:
      </p>
      <p>
        Telefon: 01234-789456 <br/>
        Telefax: 1234-56789 <br/>
        E-Mail: max@muster.de
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      3. Name und Anschrift des Datenschutzbeauftragten
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Der Datenschutzbeauftragte des Verantwortlichen ist:
      </p>
      <p>
        Max Mustermann <br/>
        Musterstraße<br/>
        12345 Musterort<br/>
        Deutschland<br/>
      </p>
      <p>
        Kontakt:
      </p>
      <p>
        Telefon: 01234-789456 <br/>
        E-Mail: max@muster.de<br/>
        Website: Bench:marked
      </p>
    </Typography>
    
    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      4. Allgemeines zur Datenverarbeitung
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Umfang der Verarbeitung personenbezogener Daten
      </p>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
      </p>
      <p>
        Rechtsgrundlage für die Verarbeitung personenbezogener Daten
      </p>
      <p>
        Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a EU-Datenschutzgrundverordnung (DSGVO) als Rechtsgrundlage. Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind. Soweit eine Verarbeitung personenbezogener Daten zur Erfüllung einer rechtlichen Verpflichtung erforderlich ist, der unser Unternehmen unterliegt, dient Art. 6 Abs. 1 lit. c DSGVO als Rechtsgrundlage. Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
      </p>
      <p>
        Ist die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich und überwiegen die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht, so dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage für die Verarbeitung.
      </p>
      <p>
      Datenlöschung und Speicherdauer
      </p>
      <p>
      Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      5. Zugriffsdaten
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
      Wir, der Websitebetreiber bzw. Seitenprovider, erheben aufgrund unseres berechtigten Interesses (s. Art. 6 Abs. 1 lit. f. DSGVO) Daten über Zugriffe auf die Website und speichern diese als „Server-Logfiles“ auf dem Server der Website ab. Folgende Daten werden so protokolliert:
      </p>
      <p>
        <List>
          <ListItem>
            - Abgefragte Aktien
          </ListItem>
          <ListItem>
            - Abgefragte Crypo Währung
          </ListItem>
          <ListItem>
            - Abgefragte Unternehmensinfo
          </ListItem>
        </List>
      </p>
      <p>
      Die Server-Logfiles werden für maximal 7 Tage gespeichert und anschließend gelöscht. Die Speicherung der Daten erfolgt aus Sicherheitsgründen, um z. B. Missbrauchsfälle aufklären zu können. Müssen Daten aus Beweisgründen aufgehoben werden, sind sie solange von der Löschung ausgenommen bis der Vorfall endgültig geklärt ist.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      6. Reichweitenmessung & Cookies
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Diese Website verwendet Cookies zur pseudonymisierten Reichweitenmessung, die entweder von unserem Server oder dem Server Dritter an den Browser des Nutzers übertragen werden. Bei Cookies handelt es sich um kleine Dateien, welche auf Ihrem Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu. Durch den Einsatz von Cookies erhöht sich die Benutzerfreundlichkeit und Sicherheit dieser Website.
      </p>
      <p>
        Falls Sie nicht möchten, dass Cookies zur Reichweitenmessung auf Ihrem Endgerät gespeichert werden, können Sie dem Einsatz dieser Dateien hier widersprechen:
      </p>
      <List>
        <ListItem>
          - Cookie-Deaktivierungsseite der Netzwerkwerbeinitiative: <a href='http://optout.networkadvertising.org/?c=1#!/'>http://optout.networkadvertising.org/?c=1#!/</a>
        </ListItem>
        <ListItem>
          - Cookie-Deaktivierungsseite der US-amerikanischen Website: <a href='http://optout.aboutads.info/?c=2#!/'>http://optout.aboutads.info/?c=2#!/</a>
        </ListItem>
        <ListItem>
          - Cookie-Deaktivierungsseite der europäischen Website: <a href='http://optout.networkadvertising.org/?c=1#!/'>http://optout.networkadvertising.org/?c=1#!/</a>
        </ListItem>
      </List>
      <p>
      Gängige Browser bieten die Einstellungsoption, Cookies nicht zuzulassen. Hinweis: Es ist nicht gewährleistet, dass Sie auf alle Funktionen dieser Website ohne Einschränkungen zugreifen können, wenn Sie entsprechende Einstellungen vornehmen.
      </p>
    </Typography>
    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Erfassung und Verarbeitung personenbezogener Daten
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Der Websitebetreiber erhebt, nutzt und gibt Ihre personenbezogenen Daten nur dann weiter, wenn dies im gesetzlichen Rahmen erlaubt ist oder Sie in die Datenerhebung einwilligen.
      </p>
      <p>
        Als personenbezogene Daten gelten sämtliche Informationen, welche dazu dienen, Ihre Person zu bestimmen und welche zu Ihnen zurückverfolgt werden können – also beispielsweise Ihr Name, Ihre E-Mail-Adresse und Telefonnummer.
      </p>
      <p>
        Diese Website können Sie auch besuchen, ohne Angaben zu Ihrer Person zu machen. Zur Verbesserung unseres Online-Angebotes speichern wir jedoch (ohne Personenbezug) Ihre Zugriffsdaten auf diese Website. Zu diesen Zugriffsdaten gehören z. B. die von Ihnen angeforderte Datei oder der Name Ihres Internet-Providers. Durch die Anonymisierung der Daten sind Rückschlüsse auf Ihre Person nicht möglich.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      7. Umgang mit Kontaktdaten
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
       Nehmen Sie mit uns als Websitebetreiber durch die angebotenen Kontaktmöglichkeiten Verbindung auf, werden Ihre Angaben gespeichert, damit auf diese zur Bearbeitung und Beantwortung Ihrer Anfrage zurückgegriffen werden kann. Ohne Ihre Einwilligung werden diese Daten nicht an Dritte weitergegeben.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      8. Rechte des Nutzers
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
      Sie haben als Nutzer das Recht, auf Antrag eine kostenlose Auskunft darüber zu erhalten, welche personenbezogenen Daten über Sie gespeichert wurden. Sie haben außerdem das Recht auf Berichtigung falscher Daten und auf die Verarbeitungseinschränkung oder Löschung Ihrer personenbezogenen Daten. Falls zutreffend, können Sie auch Ihr Recht auf Datenportabilität geltend machen. Sollten Sie annehmen, dass Ihre Daten unrechtmäßig verarbeitet wurden, können Sie eine Beschwerde bei der zuständigen Aufsichtsbehörde einreichen.
      </p>
    </Typography>
    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Löschung von Daten
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Sofern Ihr Wunsch nicht mit einer gesetzlichen Pflicht zur Aufbewahrung von Daten (z. B. Vorratsdatenspeicherung) kollidiert, haben Sie ein Anrecht auf Löschung Ihrer Daten. Von uns gespeicherte Daten werden, sollten sie für ihre Zweckbestimmung nicht mehr vonnöten sein und es keine gesetzlichen Aufbewahrungsfristen geben, gelöscht. Falls eine Löschung nicht durchgeführt werden kann, da die Daten für zulässige gesetzliche Zwecke erforderlich sind, erfolgt eine Einschränkung der Datenverarbeitung. In diesem Fall werden die Daten gesperrt und nicht für andere Zwecke verarbeitet.
      </p>
    </Typography>
   
    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      9.Widerspruchsrecht
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
        Nutzer dieser Webseite können von ihrem Widerspruchsrecht Gebrauch machen und der Verarbeitung ihrer personenbezogenen Daten zu jeder Zeit widersprechen.
      </p>
      <p>
        Wenn Sie eine Berichtigung, Sperrung, Löschung oder Auskunft über die zu Ihrer Person gespeicherten personenbezogenen Daten wünschen oder Fragen bzgl. der Erhebung, Verarbeitung oder Verwendung Ihrer personenbezogenen Daten haben oder erteilte Einwilligungen widerrufen möchten, wenden Sie sich bitte an folgende E-Mail-Adresse: max@muster.de
      </p>
    </Typography>
    
    
    
    
    
    
  </Container>
);

export default Privacy;
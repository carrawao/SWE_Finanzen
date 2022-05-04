import React from 'react';
import {Typography, Container, List, ListItem} from '@mui/material';

/**
 * Component related to AGB external page
 * @returns {JSX.Element}
 * @constructor
 */
const AGB = () => (
  <Container className='d-flex flex-column col-12 mx-0 px-3 pt-4 justify-content-start'>
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/benchmarkt-logo.png`}
      alt='Application logo'
      width='50%'
    />

    <Typography variant='h2' className='pt-4 ps-3 fw-bold'>
      AGB
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      § 1 Geltungsbereich 
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <List>
        <ListItem>
          1. Diese Verkaufsbedingungen gelten ausschließlich gegenüber Unternehmern, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen im Sinne von § 310 Absatz 1 BGB. Entgegenstehende oder von unseren Verkaufsbedingungen abweichende Bedingungen des Bestellers erkennen wir nur an, wenn wir ausdrücklich schriftlich der Geltung zustimmen. 
        </ListItem>
        <ListItem>
          2. Diese Verkaufsbedingungen gelten auch für alle zukünftigen Geschäfte mit dem Besteller, soweit es sich um Rechtsgeschäfte verwandter Art handelt (vorsorglich sollten die Verkaufsbedingungen in jedem Fall der Auftragsbestätigung beigefügt werden).
        </ListItem>
        <ListItem>
          3. Im Einzelfall getroffene, individuelle Vereinbarungen mit dem Käufer (einschließlich Nebenabreden, Ergänzungen und Änderungen) haben in jedem Fall Vorrang vor diesen Verkaufsbedingungen. Für den Inhalt derartiger Vereinbarungen ist, vorbehaltlich des Gegenbeweises, ein schriftlicher Vertrag bzw. unsere schriftliche Bestätigung maßgebend.
        </ListItem>
      </List>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      § 2 Angebot und Vertragsabschluss
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      <p>
      An allen in Zusammenhang mit der Auftragserteilung dem Besteller überlassenen Unterlagen  – auch in elektronischer Form –, wie z. B. Kalkulationen, Zeichnungen etc., behalten wir uns Eigentums- und Urheberrechte vor. Diese Unterlagen dürfen Dritten nicht zugänglich gemacht werden, es sei denn, wir erteilen dazu dem Besteller unsere ausdrückliche schriftliche Zustimmung. Soweit wir das Angebot des Bestellers nicht innerhalb der Frist von § 2 annehmen, sind diese Unterlagen uns unverzüglich zurückzusenden.
      </p>
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      § 3 Überlassene Unterlagen
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
    </Typography>
  </Container>
);

export default AGB;
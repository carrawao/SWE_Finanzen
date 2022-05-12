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
      Privacy policy
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      1. Fundamental
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      With this privacy policy we inform you about the nature, scope and purpose of the collection and use of personal
      data by the website operator.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The website operator takes your privacy very seriously and treats your personal data confidentially and in
      accordance with the statutory provisions. Since new technologies and the constant further development of this
      website may result in changes to this data protection declaration, we recommend that you read through the data
      protection declaration again at regular intervals.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The term "personal data" means all data that can be related to you personally. This includes, for example, name,
      address, e-mail addresses, user behavior. With regard to the other terms, in particular the terms "processing"
      and "consent", we refer to the legal data protection definitions.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Further definitions of terms can be found in Art. 4 DSGVO.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      2. Name and address of the responsible person
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The controller within the meaning of the General Data Protection Regulation and other national data protection
      laws of the member states as well as other data protection provisions is the:
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Bench:Market
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Postanschrift:<br/>
      Musterweg <br/>
      12345 Musterstadt
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Contact:
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Telephone: 01234-789456 <br/>
      Telefax: 1234-56789 <br/>
      E-Mail: max@muster.de
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      3. Name and address of the data protection officer
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The data protection officer of the controller is:
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Max Mustermann <br/>
      Musterstraße<br/>
      12345 Musterort<br/>
      Deutschland<br/>
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Contact:
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Telephone: 01234-789456 <br/>
      E-Mail: max@muster.de<br/>
      Website: Bench:market
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      4. General information on data processing
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Scope of the processing of personal data
    </Typography>
    <Typography>
      We process personal data of our users only insofar as this is necessary for the provision of a functional
      website and our content and services. The processing of personal data of our users is regularly only carried out
      with the consent of the user. An exception applies in those cases where obtaining prior consent is not possible
      for actual reasons and the processing of the data is permitted by legal regulations.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Legal basis for the processing of personal data
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Insofar as we obtain the consent of the data subject for processing operations involving personal data, Art. 6
      (1) (a) of the EU General Data Protection Regulation (GDPR) serves as the legal basis. When processing personal
      data that is necessary for the performance of a contract to which the data subject is a party, Art. 6 (1) lit. b
      DSGVO serves as the legal basis. This also applies to processing operations that are necessary for the
      performance of pre-contractual measures. Insofar as processing of personal data is necessary for compliance with
      a legal obligation to which our company is subject, Art. 6 (1) lit. c DSGVO serves as the legal basis. In the
      event that vital interests of the data subject or another natural person make processing of personal data
      necessary, Art. 6 (1) (d) DSGVO serves as the legal basis.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      If the processing is necessary to protect a legitimate interest of our company or a third party and the
      interests, fundamental rights and freedoms of the data subject do not override the former interest, Art. 6 (1)
      lit. f DSGVO serves as the legal basis for the processing.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Data deletion and storage duration
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The personal data of the data subject shall be deleted or blocked as soon as the purpose of the storage no
      longer applies. Storage may also take place if this has been provided for by the European or national legislator
      in Union regulations, laws or other provisions to which the controller is subject. Data will also be blocked or
      deleted if a storage period prescribed by the aforementioned standards expires, unless there is a need for
      further storage of the data for the conclusion or performance of a contract.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      5. Access data
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      We, the website operator or page provider, collect data about accesses to the website based on our legitimate
      interest (see Art. 6 para. 1 lit. f. DSGVO) and store them as "server log files" on the website server. The
      following data is logged in this way:
    </Typography>
    <List>
      <ListItem>
        - Shares queried
      </ListItem>
      <ListItem>
        - Queried Crypo Currency
      </ListItem>
      <ListItem>
        - Requested company info
      </ListItem>
    </List>
    <Typography variant='h7' className='pt-4 ps-3'>
      The server log files are stored for a maximum of 7 days and then deleted. The data is stored for security
      reasons, e.g. to be able to clarify cases of abuse. If data must be retained for evidentiary reasons, it is
      exempt from deletion until the incident has been finally clarified.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      6. Reach measurement & cookies
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      This website uses cookies for pseudonymized reach measurement, which are transferred to the user's browser
      either from our server or the server of a third party. Cookies are small files that are stored on your terminal
      device. Your browser accesses these files. The use of cookies increases the user-friendliness and security of
      this website.
    </Typography>
    <Typography>
      If you do not want cookies to be stored on your end device for the purpose of measuring reach, you can object to
      the use of these files here:
    </Typography>
    <List>
      <ListItem>
        - Cookie deactivation page of the Network Advertising Initiative:: <a
        href='http://optout.networkadvertising.org/?c=1#!/'>http://optout.networkadvertising.org/?c=1#!/</a>
      </ListItem>
      <ListItem>
        - Cookie deactivation page of the US website: <a
        href='http://optout.aboutads.info/?c=2#!/'>http://optout.aboutads.info/?c=2#!/</a>
      </ListItem>
      <ListItem>
        - Cookie deactivation page of the European website: <a
        href='http://optout.networkadvertising.org/?c=1#!/'>http://optout.networkadvertising.org/?c=1#!/</a>
      </ListItem>
    </List>
    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Common browsers offer the setting option to not allow cookies. Note: It is not guaranteed that you will be able
      to access all functions of this website without restrictions if you make the appropriate settings.
    </Typography>
    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Collection and processing of personal data
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      The website operator collects, uses and discloses your personal data only if this is permitted by law or if you
      consent to the collection of data.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Personal data is any information that can be used to identify you and that can be traced back to you - for
      example, your name, e-mail address and telephone number.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      You can also visit this website without providing any personal information. However, in order to improve our
      online offer, we store (without personal reference) your access data to this website. This access data includes,
      for example, the file you requested or the name of your Internet provider. By anonymizing the data, it is not
      possible to draw conclusions about your person.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      7. Contact details handling
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      If you contact us as the website operator through the contact options offered, your information will be stored
      so that we can use it to process and respond to your request. Without your consent, this data will not be
      disclosed to third parties.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      8. Rights of the user
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      As a user, you have the right to request free information about what personal data has been stored about you.
      You also have the right to have incorrect data corrected and to have your personal data processed restricted or
      deleted. If applicable, you may also exercise your right to data portability. If you believe that your data has
      been processed unlawfully, you may lodge a complaint with the competent supervisory authority.
    </Typography>
    <Typography variant='h6' className='pt-4 ps-3 fw-bold'>
      Data deletion
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Unless your request conflicts with a legal obligation to retain data (e.g. data retention), you have a right to
      have your data deleted. Data stored by us will be deleted if it is no longer required for its intended purpose
      and there are no legal retention periods. If deletion cannot be carried out because the data is required for
      permissible legal purposes, data processing will be restricted. In this case, the data will be blocked and not
      processed for other purposes.
    </Typography>

    <Typography variant='h4' className='pt-4 ps-3 fw-bold'>
      9. Right of objection
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      Users of this website may exercise their right to object to the processing of their personal data at any time.
    </Typography>
    <Typography variant='h7' className='pt-4 ps-3'>
      If you wish to have your personal data corrected, blocked, deleted or informed about the personal data stored
      about you, or if you have any questions regarding the collection, processing or use of your personal data, or if
      you wish to revoke any consent you have given, please contact us at the following e-mail address: max@muster.de
    </Typography>
  </Container>
);

export default Privacy;
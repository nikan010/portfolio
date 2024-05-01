<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang de gegevens van het formulier
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $message = htmlspecialchars($_POST["message"]);

    // Creëer een bericht met de ontvangen gegevens
    $formdata = "Naam: $name\nE-mail: $email\nBericht: $message\n\n";

    // Sla het bericht op in een tekstbestand
    $file = 'formdata.txt';
    file_put_contents($file, $formdata, FILE_APPEND);

    // Stuur een bevestiging naar de gebruiker
    echo "Bedankt voor uw bericht, $name! We nemen zo snel mogelijk contact met u op.";
} else {
    // Toon een foutbericht als het formulier niet correct is ingediend
    echo "Er is een fout opgetreden bij het verwerken van het formulier.";
}
?>

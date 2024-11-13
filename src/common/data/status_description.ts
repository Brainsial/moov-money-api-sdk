import { StatusMap } from "#common/types/status_map";

// This file contains the status descriptions for the Moov Money API.
// The descriptions are a list of objects with the keys 'en', 'fr', and 'es' which contain the descriptions in English, French, and Spanish respectively.
export const STATUS_DESCRIPTION: StatusMap = {
    '0': {
      en: 'Success',
      fr: 'Succès',
      es: 'Exito'
    },
    '1': {
      en: 'Not allowed on the method',
      fr: 'Méthode de transaction non autorisée',
      es: 'Método de transacción no permitido'
    },
    '2': {
      en: 'Not allowed on transaction',
      fr: 'Transaction non autorisée',
      es: 'Transacción no permitida'
    },
    '3': {
      en: 'Number is not valid',
      fr: 'Numéro invalide',
      es: 'Número no válido'
    },
    '4': {
      en: '',
      fr: '',
      es: ''
    },
    '6': {
      en: 'Destination is not allowed to receive a transfer',
      fr: 'La destination n\'est pas autorisée à recevoir un transfert',
      es: 'El destino no está autorizado para recibir una transferencia'
    },
    '7': {
      en: 'Destination is locked',
      fr: 'La destination est bloquée',
      es: 'El destino esta bloqueado'
    },
    '9': {
      en: 'Destination is inactive',
      fr: 'La destination est inactif',
      es: 'El destino esta inactivo'
    },
    '10': {
      en: 'Balance is insufficient',
      fr: 'Solde insuffisant',
      es: 'Saldo insuficiente'
    },
    '11': {
      en: 'Cannot send on the above amount',
      fr: 'Impossible d\'envoyer au-dessus de ce montant',
      es: 'No se puede enviar por encima de esta cantidad'
    },
    '12': {
      en: 'Cannot send on the below amount',
      fr: 'Impossible d\'envoyer en dessous de ce montant',
      es: 'No se puede enviar por debajo de esta cantidad'
    },
    '13': {
      en: 'Already reach the maximum amount per day',
      fr: 'Montant maximum journalier atteint',
      es: 'Ya alcanzó el monto máximo por día'
    },
    '14': {
      en: 'Already reach the maximum amount per month',
      fr: 'Montant maximum mensuel atteint',
      es: 'Ya alcanzó el monto máximo por mes'
    },
    '15': {
      en: 'Already reach the maximum daily transactions',
      fr: 'Nombre maximum de transactions journalières atteint',
      es: 'Ya alcanzó el máximo de transacciones diarias'
    },
    '16': {
      en: 'Already reach the maximum monthly transactions',
      fr: 'Nombre maximum de transactions mensuelles atteint',
      es: 'Ya alcanzó el máximo de transacciones mensuales'
    },
    '17': {
      en: 'Destination cannot received on the below amount',
      fr: 'La destination ne peut pas recevoir en dessous de ce montant',
      es: 'El destino no puede recibir por debajo de esta cantidad'
    },
    '18': {
      en: 'Destination cannot received reach the maximum balance',
      fr: 'La destination ne peut pas recevoir; solde maximum atteint',
      es: 'El destino no puede recibir; alcanzó el saldo.maxcdn'
    },
    '19': {
      en: 'Sender reach the maximum daily transaction',
      fr: 'L\'expéditeur a atteint le maximum de transactions journalières',
      es: 'El remitente alcanzó el máximo de transacciones diarias'
    },
    '20': {
      en: 'Sender reach the maximum monthly transaction',
      fr: 'L\'expéditeur a atteint le maximum de transactions mensuelles',
      es: 'El remitente alcanzó el máximo de transacciones mensuales'
    },
    '91': {
      en: 'Parameters Incomplete',
      fr: 'Paramètres incomplets',
      es: 'Parámetros incompletos'
    },
    '92': {
      en: 'Exception on USSD PUSH',
      fr: 'Exception sur le USSD PUSH',
      es: 'Excepción en el USSD PUSH'
    },
    '94': {
      en: 'Transaction not exists',
      fr: 'La transaction n\'existe pas',
      es: 'La transacción no existe'
    },
    '95': {
      en: 'Transaction Failed',
      fr: 'La transaction a echoué',
      es: 'La transacción fallo'
    },
    '98': {
      en: 'Invalid Token',
      fr: 'Identifiants invalides',
      es: 'Credenciales inválidas'
    },
    '99': {
      en: 'System Busy',
      fr: 'Le système est occupé',
      es: 'El sistema está ocupado'
    },
    '100': {
      en: '',
      fr: '',
      es: ''
    },
    '-1': {
      en: 'System Busy',
      fr: 'Le système est occupé',
      es: 'El sistema está ocupado'
    },
    '555': {
      en: 'Not Registered',
      fr: 'Non enregistré',
      es: 'No registrado'
    }
}
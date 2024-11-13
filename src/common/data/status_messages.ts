import { StatusMap } from '#common/types/status_map';

// This file contains the status messages for the Moov Money API.
// The messages are a list of objects with the keys 'en', 'fr', and 'es' which contain the messages in English, French, and Spanish respectively.
export const STATUS_MESSAGES: StatusMap = {
    '0': {
      en: 'Transaction Completed',
      fr: 'Transaction terminée',
      es: 'Transacción completada'
    },
    '1': {
      en: 'Not allowed on the method transaction',
      fr: 'Méthode de transaction non autorisée',
      es: 'Método de transacción no permitido'
    },
    '2': {
      en: 'Not allowed on the transaction',
      fr: 'Transaction non autorisée',
      es: 'Transacción no permitida'
    },
    '3': {
      en: 'Number is not valid',
      fr: 'Numéro invalide',
      es: 'Número no válido'
    },
    '4': {
      en: 'The user does not have permission to perform this action',
      fr: 'L\'utilisateur n\'a pas les permissions pour effectuer cette action',
      es: 'El usuario no tiene permiso para realizar esta acción'
    },
    '6': {
      en: 'Destination is not allowed to receive a transfer',
      fr: 'La destination n\'est pas autorisée à recevoir un transfert',
      es: 'El destino no está autorizado para recibir una transferencia'
    },
    '7': {
      en: 'Destination is locked',
      fr: 'La destination est verrouillée',
      es: 'El destino está bloqueado'
    },
    '9': {
      en: 'Destination is inactive',
      fr: 'La destination est inactive',
      es: 'El destino está inactivo'
    },
    '10': {
      en: 'Funds is insufficient',
      fr: 'Fonds insuffisants',
      es: 'Fondos insuficientes'
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
      en: 'Already reached the maximum amount per day',
      fr: 'Montant maximum journalier atteint',
      es: 'Ya alcanzó el monto máximo por día'
    },
    '14': {
      en: 'Already reached the maximum amount per month',
      fr: 'Montant maximum mensuel atteint',
      es: 'Ya alcanzó el monto máximo por mes'
    },
    '15': {
      en: 'Already reached the maximum daily transactions',
      fr: 'Nombre maximum de transactions journalières atteint',
      es: 'Ya alcanzó el máximo de transacciones diarias'
    },
    '16': {
      en: 'Already reached the maximum monthly transactions',
      fr: 'Nombre maximum de transactions mensuelles atteint',
      es: 'Ya alcanzó el máximo de transacciones mensuales'
    },
    '17': {
      en: 'Destination cannot receive on the below amount',
      fr: 'La destination ne peut pas recevoir en dessous de ce montant',
      es: 'El destino no puede recibir por debajo de esta cantidad'
    },
    '18': {
      en: 'Destination cannot receive; reached the maximum balance',
      fr: 'La destination ne peut pas recevoir; solde maximum atteint',
      es: 'El destino no puede recibir; alcanzó el saldo máximo'
    },
    '19': {
      en: 'Sender reached the maximum daily transaction',
      fr: 'L\'expéditeur a atteint le maximum de transactions journalières',
      es: 'El remitente alcanzó el máximo de transacciones diarias'
    },
    '20': {
      en: 'Sender reached the maximum monthly transaction',
      fr: 'L\'expéditeur a atteint le maximum de transactions mensuelles',
      es: 'El remitente alcanzó el máximo de transacciones mensuales'
    },
    '91': {
      en: 'Parameters not complete',
      fr: 'Paramètres incomplets',
      es: 'Parámetros incompletos'
    },
    '92': {
      en: 'Exception on USSD PUSH Timeout in USSD PUSH/ Cancel in USSD PUSH',
      fr: 'Exception sur le timeout USSD PUSH dans USSD PUSH/ Annulation dans USSD PUSH',
      es: 'Excepción en el tiempo de espera de USSD PUSH en USSD PUSH/ Cancelación en USSD PUSH'
    },
    '94': {
      en: 'Transaction does not exist',
      fr: 'La transaction n\'existe pas',
      es: 'La transacción no existe'
    },
    '95': {
      en: 'Transaction failed due to error',
      fr: 'La transaction a échoué en raison d\'une erreur',
      es: 'La transacción falló debido a un error'
    },
    '98': {
      en: 'Invalid Credentials',
      fr: 'Identifiants invalides',
      es: 'Credenciales inválidas'
    },
    '99': {
      en: 'Interface Internal error/Database connection error',
      fr: 'Erreur interne de l\'interface/Erreur de connexion à la base de données',
      es: 'Error interno de interfaz/Error de conexión a la base de datos'
    },
    '100': {
      en: 'In pending state',
      fr: 'En attente',
      es: 'En estado pendiente'
    },
    '-1': {
      en: 'Interface Internal error/Database connection error',
      fr: 'Erreur interne de l\'interface/Erreur de connexion à la base de données',
      es: 'Error interno de interfaz/Error de conexión a la base de datos'
    },
    '555': {
      en: 'Not Registered: Destination Subscriber is not registered on Moov Money',
      fr: 'Non enregistré: L\'abonné destinataire n\'est pas enregistré sur Moov Money',
      es: 'No registrado: El suscriptor de destino no está registrado en Moov Money'
    }
  };
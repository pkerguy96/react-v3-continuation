export const CACHE_KEY_PATIENTS = ["patients"]; /*  */
export const CACHE_KEY_PatientsWaitingRoom = ["PatientCounterWaitingroom"];
export const CACHE_KEY_NURSES = ["nurses"];
export const CACHE_KEY_WAITINGLIST = ["Waitinglist"];
export const CACHE_KEY_APPOINTMENTS = ["appointments"];
export const CACHE_KEY_Ordonance = ["ordonance"];
export const CACHE_KEY_Operation = ["operation"];
export const CACHE_KEY_PatientDetails = "patientdetails";
export const CACHE_KEY_OperationDetail = "operationdetail";
export const CACHE_KEY_UploadInfo = ["uploadinfo"];
export const CACHE_KEY_UploadUrl = ["UploadUrl"];
export const CACHE_KEY_AppointmentsCount = ["AppointmentsCount"];
export const CACHE_KEY_RevenueKpi = ["RevenueKpi"];
export const CACHE_KEY_CanceledApppointments = ["CanceledApppointments"];
export const CACHE_KEY_Agegroup = ["PatientsAgeGroup"];
export const CACHE_KEY_Cachier = ["Cachier"];
export const CACHE_KEY_OperationPref = ["OperationPref"];
export const CACHE_KEY_CachierNumber = ["CachierNumber"];
export const CACHE_KEY_totalPatients = ["totalPatients"];
export const CACHE_KEY_AppointmentsKpi = ["AppointmentsKpi"];
export const CACHE_KEY_Role = ["Role"];
export const CACHE_KEY_NurseRole = ["NurseRole"];
export const CACHE_KEY_WaitingRoom = ["waitingroomcounter"];
export const CACHE_KEY_Rolespermissions = ["rolespermission"];
export const CACHE_KEY_UsersRolePermission = ["Usersrolespermission"];
export const CACHE_KEY_incompletedOperations = ["incompletedOperations"];
export const CACHE_KEY_Products = ["Products"];
export const CACHE_KEY_Xray = "Xray";
export const CACHE_KEY_Bloodtest = ["BloodTest"];
export const CACHE_KEY_Notification = ["Notifications"];
export const CACHE_KEY_XrayPreferences = ["XrayPreferences"];
export const CACHE_KEY_Suppliers = ["Suppliers"];
export const CACHE_KEY_NurseXray = ["NurseXray"];
export const CACHE_KEY_RecurringOperations = ["RecurringOperations"];
export const CACHE_KEY_SupplierTinyData = ["SupplierTinyData"];
export const CACHE_KEY_ProductOperation = ["ProductOperation"];
export const CACHE_KEY_ProductConsumed = ["ProductConsumed"];
export const CACHE_KEY_MonthlyAppointments = ["MonthlyAppointments"];
export const CACHE_KEY_Hospitals = ["Hospitals"];
export const CACHE_KEY_Hospitaloperations = ["Hospitaloperations"];
export const CACHE_KEY_SearchPatients = ["SearchPatients"];
export const CACHE_KEY_CanceledMonthlyAppointments = [
  "CanceledMonthlyAppointments",
];
export const CACHE_KEY_Url = "urllist";
export const CACHE_KEY_StockExit = ["StockExit"];
export const CACHE_KEY_StockEntry = ["StockEntry"];

export const CACHE_KEY_StockEntryUpdate = ["StockEntryUpdate"];

export const PermissionListpatient = [
  { name: "access_patient", display: "Accès complet" },
  { name: "insert_patient", display: "Ajouter un patient" },
  { name: "update_patient", display: "Modifier un patient" },
  { name: "delete_patient", display: "Supprimer un patient" },
  { name: "detail_patient", display: "Détails du patient" },
];

export const reoccuringoperations = [
  {
    name: "access_operation_recurring",
    display: "Accès Opérations inachevées",
  },
];
export const PermissionListordonance = [
  { name: "access_ordonance", display: "Accès complet" },
  { name: "insert_ordonance", display: "Ajouter une ordonnance" },
  { name: "update_ordonance", display: "Modifier une ordonnance" },
  { name: "delete_ordonance", display: "Supprimer une ordonnance" },
];
export const PermissionListcreance = [
  { name: "access_creance", display: "Accès complet" },
];

export const PermissionListdebt = [
  { name: "access_debt", display: "Accès complet" },
  { name: "insert_debt", display: "Ajouter un paiement" },
  { name: "delete_debt", display: "Supprimer un paiement" },
];
export const PermissionExternalListExternalDebt = [
  { name: "access_external_debt", display: "Accès complet (dette externe)" },
  {
    name: "insert_external_debt",
    display: "Ajouter un paiement (dette externe)",
  },
  {
    name: "delete_external_debt",
    display: "Supprimer un paiement (dette externe)",
  },
];

export const PermissionListdocument = [
  { name: "access_document", display: "Accès complet" },
  { name: "insert_document", display: "Ajouter un document" },
  { name: "delete_document", display: "Supprimer un document" },
  { name: "download_document", display: "Télécharger un document" },
  { name: "detail_document", display: "Voir un document" },
];
export const PermissionListSupplier = [
  { name: "access_supplier", display: "Accès complet" },
  { name: "add_supplier", display: "Ajouter un fournisseur" },
  { name: "delete_supplier", display: "Supprimer un fournisseur" },
  { name: "modify_supplier", display: "Modifier un fournisseur" },
];
export const PermissionListProduct = [
  { name: "access_product", display: "Accès complet" },
  { name: "add_product", display: "Ajouter un produit" },
  { name: "delete_product", display: "Supprimer un produit" },
  { name: "modify_product", display: "Modifier un produit" },
  { name: "add_stock", display: "Ajouter au stock" },
];

export const PermissionListHistoriqueEnter = [
  { name: "access_historique_enter", display: "Accès complet" },
  { name: "modify_historique_enter", display: "Modifier historique enter" },

  {
    name: "delete_historique_enter",
    display: "Supprimer une entrée historique",
  },
];
export const PermissionListHistoriqueSortie = [
  { name: "access_historique_sortie", display: "Accès complet" },
  {
    name: "delete_historique_sortie",
    display: "Supprimer une sortie historique",
  },
];

export const referral = [
  {
    title: "Direct",
    value: "Direct",
  },
  {
    title: "Recherche organique",
    value: "Recherche organique",
  },
  {
    title: "Réseaux sociaux",
    value: "Réseaux sociaux",
  },
  {
    title: "Recherche payante",
    value: "Recherche payante",
  },
  {
    title: "Référencement",
    value: "Référencement",
  },
  {
    title: "Affiliation",
    value: "Affiliation",
  },
  {
    title: "Marketing d'influence",
    value: "Marketing d'influence",
  },
  {
    title: "Annuaires locaux et cartes",
    value: "Annuaires locaux et cartes",
  },
];
export const Allergies = [
  { title: "Pollen", value: "Pollen" },
  { title: "Acariens", value: "Acariens" },
  { title: "Poils d'animaux", value: "Poils d'animaux" },
  { title: "Arachides", value: "Arachides" },
  { title: "Antibiotiques", value: "Antibiotiques" },
  { title: "Latex", value: "Latex" },
  { title: "Fruits de mer", value: "Fruits de mer" },
  { title: "Noix", value: "Noix" },
  { title: "Médicaments", value: "Médicaments" },
  { title: "Moisissures", value: "Moisissures" },
];
export const Maladies = [
  { title: "Diabète", value: "Diabète" },
  { title: "Hypertension", value: "Hypertension" },
  { title: "Asthme", value: "Asthme" },
  { title: "Bronchite", value: "Bronchite" },
  { title: "Anémie", value: "Anémie" },
  { title: "Grippe", value: "Grippe" },
  { title: "Arthrite", value: "Arthrite" },
  { title: "Allergies saisonnières", value: "Allergies saisonnières" },
  { title: "Migraine", value: "Migraine" },
  { title: "Pneumonie", value: "Pneumonie" },
  { title: "Insuffisance cardiaque", value: "Insuffisance cardiaque" },
  { title: "Cancer", value: "Cancer" },
  { title: "COVID-19", value: "COVID-19" },
  { title: "Dépression", value: "Dépression" },
  { title: "Anxiété", value: "Anxiété" },
  { title: "Hypercholestérolémie", value: "Hypercholestérolémie" },
  { title: "Insomnie", value: "Insomnie" },
  { title: "Gastro-entérite", value: "Gastro-entérite" },
  { title: "Sinusite", value: "Sinusite" },
  { title: "Ostéoporose", value: "Ostéoporose" },
];

export const ViewTypes = [
  { title: "Face", value: "Face" },
  { title: "Profil", value: "Profil" },
];

export const BodySides = [
  { title: "Gauche", value: "Gauche" },
  { title: "Droite", value: "Droite" },
  { title: "Les deux", value: "Les_Deux" },
];
export const BoneDoctorBloodTests = [
  { title: "Calcium", value: "Calcium" },
  { title: "Phosphore", value: "Phosphore" },
  { title: "Vitamine D", value: "Vitamine_D" },
  { title: "Protéine C-réactive (CRP)", value: "CRP" },
  { title: "Vitesse de sédimentation (VS)", value: "VS" },
  { title: "Facteur rhumatoïde", value: "Facteur_Rhumatoïde" },
  { title: "Acide urique", value: "Acide_Urique" },
  { title: "Phosphatase alcaline", value: "Phosphatase_Alcaline" },
  { title: "Anticorps antinucléaires (ANA)", value: "ANA" },
  { title: "Numération formule sanguine (NFS)", value: "NFS" },
  { title: "Parathormone (PTH)", value: "Parathormone" },
  { title: "Créatinine", value: "Créatinine" },
];

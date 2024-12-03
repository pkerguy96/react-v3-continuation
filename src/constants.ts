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
export const CACHE_KEY_TvWaitingRoom = ["TvWaitingRoom"];
export const CACHE_KEY_PatientReferral = ["PatientReferral"];

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
export const settingsPermissions = [
  { name: "access_op_settings", display: "Opération paramètres" },
  {
    name: "access_xray_settings",
    display: "Radiographie paramètres",
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

export const Analyses = {
  "Chimie courante": [
    {
      analyse: "Acide urique",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Albuminémie (Méthode immunologique)",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Ammoniémie",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Bilirubine (Totale Directe et Indirecte)",
      B: 70,
      prix: 93.8,
    },
    {
      analyse: "Calcium",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Chlore",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Chlore Cholestérol total",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Cholestérol estérifié",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Cholestérol H D L",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Cholestérol L D L",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Cholestérol HDL+ L D L",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Créatinine",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Electrophorèse de l'hémoglobine",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Electrophorèse des lipides",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Electrophorèse des protides",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Fer sérique",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Fer sérique+C T F",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Fructosamine",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Glycémie",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Hémoglobine glycosylée",
      B: 100,
      prix: 134,
    },
    {
      analyse: "lonogramme complet( Na, K, CI, Prot, RA, Ca)",
      B: 160,
      prix: 214.4,
    },
    {
      analyse: "Lipides",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Lipoprotéine A",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Lipoprotéine B",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Lipoprotéine A+B",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Lithium",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Magnésium plasmatique",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Magnésium erythrocytaire",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Oxalates",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Phosphore minéral",
      B: 40,
      prix: 53.6,
    },
    {
      analyse: "Protéines",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Potassium",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Réserve alcaline",
      B: 40,
      prix: 53.6,
    },
    {
      analyse: "Sodium",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Triglycérides",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Urée",
      B: 30,
      prix: 40.2,
    },
  ],
  Enzymologie: [
    {
      analyse: "Aldolase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Amylase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "CPK",
      B: 100,
      prix: 134,
    },
    {
      analyse: "CPK(NIB)",
      B: 200,
      prix: 268,
    },
    {
      analyse: "G6PDH",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Gamma glutamyl transférase (GGT)",
      B: 50,
      prix: 67,
    },
    {
      analyse: "LDH",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Phosphatases alcalines",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Phosphatases acides",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Phosphatases prostatiques",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Transaminases 0 (TGO)",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Transaminases P (TGP)",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Lipase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Troponine",
      B: 250,
      prix: 335,
    },
  ],
  Hormonologie: [
    {
      analyse: "BHCG quantitatif",
      B: 250,
      prix: 335,
    },
    {
      analyse: "BHCG qualitatif",
      B: 100,
      prix: 134,
    },
    {
      analyse: "17BOestradiol",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Cortisol",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Ferritine",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Insuline",
      B: 300,
      prix: 402,
    },
    {
      analyse: "LH",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Progestérone",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Prolactine",
      B: 250,
      prix: 335,
    },
    {
      analyse: "T3",
      B: 200,
      prix: 268,
    },
    {
      analyse: "T4",
      B: 200,
      prix: 268,
    },
    {
      analyse: "T4 libre",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Testostérone",
      B: 300,
      prix: 402,
    },
    {
      analyse: "TSH",
      B: 250,
      prix: 335,
    },
    {
      analyse: "TSH us",
      B: 250,
      prix: 335,
    },
    {
      analyse: "T3L",
      B: 300,
      prix: 402,
    },
  ],
  "Chimies courante": [
    {
      analyse: "Acétone (recherche)",
      B: 10,
      prix: 13.4,
    },

    {
      analyse: "Calcium",
      B: 30,
      prix: 40.2,
    },

    {
      analyse: "Créatinine",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Electrophorèse des protéines urinaires",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Identification d'un calcul urinaire",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Ph",
      B: 10,
      prix: 13.4,
    },
    {
      analyse: "Phosphore minéral",
      B: 40,
      prix: 53.6,
    },
    {
      analyse: "Potassium",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Protéine (recherche)",
      B: 20,
      prix: 26.8,
    },
    {
      analyse: "Protéine (dosage)",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Sédiment minéral",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Sodium",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Sucre (recherche)",
      B: 10,
      prix: 13.4,
    },
    {
      analyse: "Sucre (recherche + dosage)",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Urée",
      B: 30,
      prix: 40.2,
    },
  ],
  Hormonologies: [
    {
      analyse: "Acide 5 hydroxyindol acétique (5 HIA)",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Acide vanyl mandélique (VMA)",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Acide hormovanilique",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Catécholamines",
      B: 250,
      prix: 335,
    },
    {
      analyse: "17 cétosteroides",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Dérivés méthoxylés (Métanéphrines-normétanéphrines)",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Phenolstéroides",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Porphyrines (recherche)",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Porphyrines (dosage)",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Prégnandiol",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Prolans B",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Test de grossesse",
      B: 80,
      prix: 107.2,
    },
  ],
  "Épreuves fonctionnelles": [
    {
      analyse: "Clearances de l'acide urique",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Clearances de l'urée",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Clearances de la créatinine",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Épreuve d'hyperglycémie provoquée par voie orale",
      B: 150,
      prix: 201,
    },
    {
      analyse: "HLM (hématies-leucocytes-minutes) test d'Addis",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Test au D-xylose",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Test LH-RH: (4 temps) Sur FSH ou LH",
      B: 700,
      prix: 938,
    },
    {
      analyse: "Test LH-RH: (4 temps) Sur FSH et LH",
      B: 1200,
      prix: 1608,
    },
  ],
  "Bactériologie parasitologie mycologie": [
    {
      analyse: "Cytologie, culture, identification",
      B: 90,
      prix: 120.6,
    },
    {
      analyse: "Antibiogramme",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Sulfamidogramme",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Cytologie (en cas de prescription isolée)",
      B: 20,
      prix: 26.8,
    },
    {
      analyse: "Examen parasitologique urinaire ou vaginal",
      B: 20,
      prix: 26.8,
    },
    {
      analyse: "Examen mycologique (recherche)",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Examen mycologique (culture, identification)",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Recherche de BK + Concentration",
      B: 35,
      prix: 46.9,
    },
    {
      analyse: "Culture de Lowenstein",
      B: 30,
      prix: 40.2,
    },
  ],
  Hémoculture: [
    {
      analyse: "Culture (Aérobie-Anaérobie)",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Identification",
      B: 30,
      prix: 40.2,
    },
    {
      analyse: "Recherche Chlamydiae direct par IA ou IF",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Recherche de Myco asmes par culture",
      B: 200,
      prix: 268,
    },
  ],
  "Examen des selles": [
    {
      analyse: "Parasitologie (Examen direct + enrichissement)",
      B: 40,
      prix: 53.6,
    },
    {
      analyse: "Coproculture + identification",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Recherche de sang par méthode colorimétrique",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Recherche de sang par méthode immunologique",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Coprologie fonctionnelle",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Rotavirus",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Adénovirus",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Scttch test",
      B: 20,
      prix: 26.8,
    },
    {
      analyse: "Ectoparasites (Galle) recherche",
      B: 50,
      prix: 67,
    },
  ],
  "Sérologie bactérienne": [
    {
      analyse: "Antistaphylolysine",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Antistreptodornase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Antistreptokinase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Antistreptolysine (Recherche, tirage)",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Antistreptohyaluronidase",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Brucellose (Wright)",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "Chlamydiae trachomatis",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Hélicobacter pylori",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Diphtérie",
      B: 190,
      prix: 254.6,
    },
    {
      analyse: "Gonococcie",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Léptospirose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Listériose",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Maladie de Lyme",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Mycoplasmes génitaux (Hominis et uréalyticum)",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Mycoplasma pneumoniae",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Rickettsiose",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Salmonellose (Widal et Félix)",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Shigellose: I'espèce",
      B: 75,
      prix: 100.5,
    },
    {
      analyse: "Streptozyme",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Sérologie du BK",
      B: 200,
      prix: 268,
    },
  ],
  "Sérologie de la Syphilis": [
    {
      analyse: "VDRL qualitatif",
      B: 20,
      prix: 26.8,
    },
    {
      analyse: "VDRL quantitatif",
      B: 60,
      prix: 80.4,
    },
    {
      analyse: "TPHA qualitatif",
      B: 50,
      prix: 67,
    },
    {
      analyse: "TPHA quantitatif",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Nelson",
      B: 500,
      prix: 670,
    },
    {
      analyse: "FTA Absorbens IgG",
      B: 120,
      prix: 160.8,
    },
    {
      analyse: "IgM",
      B: 280,
      prix: 375.2,
    },
  ],
  "Sérologie parasitaire": [
    {
      analyse: "Ankylostomiase",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Amibiase",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Aspergillose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Bilharziose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Hydatidose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Blastomycose",
      B: 75,
      prix: 100.5,
    },
    {
      analyse: "Candidose",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Coccidiomycose",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Cryptococcose",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Criptosporidiose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Cysticércose",
      B: 315,
      prix: 422.1,
    },
    {
      analyse: "Distomatose",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Filariose",
      B: 225,
      prix: 301.5,
    },
    {
      analyse: "Histo asmose",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Leichmaniose",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Paludisme",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Toxocarose",
      B: 315,
      prix: 422.1,
    },
    {
      analyse: "Toxoplasmose IgG",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Toxoplasmose IgM",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Taenia",
      B: 90,
      prix: 120.6,
    },
    {
      analyse: "Trichonose",
      B: 225,
      prix: 301.5,
    },
    {
      analyse: "Trichomonas",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Trypanosome",
      B: 110,
      prix: 147.4,
    },
  ],
  "Sérologie Virale": [
    {
      analyse: "Adénovirus",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Grippe antigéne B",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Hépatite A / IgG",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite A / IGM",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite B / Ag HBS",
      B: 120,
      prix: 160.8,
    },
    {
      analyse: "Hépatite B / Ac anti Hbs",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite B / Ag Hbe",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite B / Ac anti Hbe",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite B / Ac anti Hbc",
      B: 250,
      prix: 335,
    },
    {
      analyse: "Hépatite B / Ac anti Hbc IgM",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Hepatite B ADN par PCR",
      B: 600,
      prix: 804,
    },
    {
      analyse: "Hepatite C / Dépistage",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Hepatite C / test de confirmation",
      B: 600,
      prix: 804,
    },
    {
      analyse: "Hepatite C / ARN par PCR",
      B: 900,
      prix: 1206,
    },
    {
      analyse: "Herpes virus simplex type I (IgG ou IgM)",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Herpes virus simplex type II (IgG ou IgM)",
      B: 200,
      prix: 268,
    },
    {
      analyse: "HIV: HIV1+HIV (1+2) dépistage",
      B: 200,
      prix: 268,
    },
    {
      analyse: "HIV: Westernblot de confirmation",
      B: 600,
      prix: 804,
    },
    {
      analyse: "HIV: Charge virale HIV",
      B: 900,
      prix: 1206,
    },
    {
      analyse: "Mononucléose infectieuse: MNI test",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Mononucléose infectieuse: Paul et Bunelle Davidson",
      B: 80,
      prix: 107.2,
    },
    {
      analyse: "Ac EBNA",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Ac VCA",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Ac EA",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Oreillons (IgG+IgM)",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Para influenzae virus",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Coxackie",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Poliomyélite",
      B: 110,
      prix: 147.4,
    },
    {
      analyse: "Rotavirus",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Rougeole IgG ou IgM",
      B: 330,
      prix: 442.2,
    },
    {
      analyse: "Rubéole IgG",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Rubéole IgM",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Varicelle et zona",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Virus Syncitial respiratoire",
      B: 200,
      prix: 268,
    },
  ],
  Immunologie: [
    {
      analyse: "Auto anticorps anti nucléaires",
      B: 150,
      prix: 201,
    },
    {
      analyse: "AntiThyroidiens : Microsomaux",
      B: 150,
      prix: 201,
    },
    {
      analyse: "AntiThyroidiens : Thyroglobulines",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Complément total CH50",
      B: 100,
      prix: 134,
    },
    {
      analyse: "C3",
      B: 150,
      prix: 201,
    },
    {
      analyse: "C4",
      B: 150,
      prix: 201,
    },
    {
      analyse: "C1 Inhibiteur estérase",
      B: 150,
      prix: 201,
    },
    {
      analyse: "IgE totales",
      B: 200,
      prix: 268,
    },
    {
      analyse: "IgE spécifiques ou Rast: 1 Allergène",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "IgE spécifiques ou Rast: à partir du 3ème Allergène (chacun)",
      B: 140,
      prix: 187.6,
    },
    {
      analyse: "IgE spécifiques ou Rast: Test multi Allergènes",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Immunofixation des protides ou Immunoelectrophorèse",
      B: 600,
      prix: 804,
    },
    {
      analyse: "Marqueurs tumoraux",
      B: 250,
      prix: 335,
    },
    {
      analyse: "ACE",
      B: 250,
      prix: 335,
    },
    {
      analyse: "AFP",
      B: 250,
      prix: 335,
    },
    {
      analyse: "PSA",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Ca 125",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Ca 15 3",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Ca 19 9",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Ca 50",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Ca 72 4",
      B: 400,
      prix: 536,
    },
    {
      analyse: "NSE",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Test au latex",
      B: 50,
      prix: 67,
    },
    {
      analyse: "Tréaction de Waaler Rose",
      B: 50,
      prix: 67,
    },
    {
      analyse: "CRP",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Haptoglobine",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Orosomucoides",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Transférrine",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Alpha 1 Antitrypsine",
      B: 150,
      prix: 201,
    },
    {
      analyse: "IgG totales",
      B: 150,
      prix: 201,
    },
    {
      analyse: "IgA totales",
      B: 150,
      prix: 201,
    },
    {
      analyse: "IgM totales",
      B: 150,
      prix: 201,
    },
  ],
  Divers: [
    {
      analyse: "Crèatorrhéé",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Spermogramme",
      B: 100,
      prix: 134,
    },
    {
      analyse: "Spermocytogramme",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Stéatorrhée",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Test de Huhner",
      B: 120,
      prix: 160.8,
    },
  ],
  "Prescriptions pouvant faire l'objet de transmission à l'étranger": [
    {
      analyse: "17 Hydroxyprogestèrone",
      B: 400,
      prix: 536,
    },
    {
      analyse: "25 Hydroxy cholescalciférol",
      B: 450,
      prix: 603,
    },
    {
      analyse: "ACTH",
      B: 400,
      prix: 536,
    },
    {
      analyse: "ADH",
      B: 400,
      prix: 536,
    },
    {
      analyse: "ADN Viral HBV",
      B: 600,
      prix: 804,
    },
    {
      analyse: "Aldostérone",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Aluminium",
      B: 180,
      prix: 241.2,
    },
    {
      analyse: "Androstenédiol",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Anticorps Anti canneaux biliaires",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Anticorps Anti cartilage",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Anticorps Anti cellules nerveuses",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Anticorps Anti ECT",
      B: 500,
      prix: 670,
    },
    {
      analyse: "Anticorps Anti Facteur intrinsèque",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Anticorps Anti organes (autres)",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Anticorps Anti Plaquettes fixées",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Anticorps Anti T3",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Anticorps Anti T4",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Anticorps Viral HCV",
      B: 900,
      prix: 1206,
    },
    {
      analyse: "Ca 50",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Calcitonine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Carnitine libre",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Charges Virale HIV",
      B: 900,
      prix: 1206,
    },
    {
      analyse: "Citrate dans le sperme",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Complément C2",
      B: 240,
      prix: 321.6,
    },
    {
      analyse: "Complément C5",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Delta 4 Androsténe dione",
      B: 400,
      prix: 536,
    },
    {
      analyse: "DHA",
      B: 400,
      prix: 536,
    },
    {
      analyse: "DHA sulfate",
      B: 400,
      prix: 536,
    },
    {
      analyse: "DHT",
      B: 400,
      prix: 536,
    },
    {
      analyse: "EBV: EARLY ou VCA (IgG+IgM) ou EBNA chacun",
      B: 400,
      prix: 536,
    },
    {
      analyse: "EBV: ECA",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Elastase",
      B: 600,
      prix: 804,
    },
    {
      analyse: "Erytropïoetine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Fibronectine",
      B: 150,
      prix: 201,
    },
    {
      analyse: "Gastrine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "GH ou STH",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Glucagon",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Hépatite E",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Hépatite Delta",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Hydroxyproline",
      B: 400,
      prix: 536,
    },
    {
      analyse: "IgG 4 (sous classe)",
      B: 200,
      prix: 268,
    },
    {
      analyse: "Il Deoxycortisol",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Médicaments (digoxine théophylline) chacun",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Nelson",
      B: 500,
      prix: 670,
    },
    {
      analyse: "Ostéocalcine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Parathormone",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Peptide C",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Rénine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Sérotonine",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Somatomédine C",
      B: 400,
      prix: 536,
    },
    {
      analyse: "TBG",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Te BG",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Test à la STH",
      B: 1200,
      prix: 1608,
    },
    {
      analyse: "Thyrocalcitonine",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Virus (culture)",
      B: 300,
      prix: 402,
    },
    {
      analyse: "Vitamine B12",
      B: 400,
      prix: 536,
    },
    {
      analyse: "Vitamine D",
      B: 450,
      prix: 603,
    },
    {
      analyse: "Autres vitamines (K-A-E) chacune",
      B: 800,
      prix: 1072,
    },
    {
      analyse: "Zinc dans le sperme",
      B: 200,
      prix: 268,
    },
  ],
};

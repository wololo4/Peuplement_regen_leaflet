var couche, severe;
var map;
var jsonTest;
var myLayersControl;

const id = 'id'
const origine = 'origine'
const type_couv = 'type_couv'
const gr_ess = 'gr_ess'
const cl_age = 'cl_age'
const cl_dens = 'cl_dens'
const dep_sur = 'dep_sur'
const cl_drai = 'cl_drai'
const co_ter = 'co_ter'

var vert = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "green",
    fillOpacity : 1
};

var jaune = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "yellow",
    fillOpacity : 1
};

var rouge = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "red",
    fillOpacity : 1
};

var gris = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "grey",
    fillOpacity : 1
};

var blanc = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "white",
    fillOpacity : 1
};

var mauve = {
    color : "black",
    weight: 0.5,
    opacity : 1,
    fillColor: "purple",
    fillOpacity : 1
};

/*var origine = feature.properties.origine
var type_couv = feature.properties.type_couv
var gr_ess = feature.properties.gr_ess
var cl_age = feature.properties.cl_age
var cl_dens = feature.properties.cl_dens
var dep_sur = feature.properties.dep_sur
var cl_drai = feature.properties.cl_drai
var co_ter = feature.properties.co_ter*/

function severe(feature) {
    var SOL = 0
    var PLANTATION = "non"
    var REGROUPEMENT = "ind"
    var regen = "ind"
    var cl_age = feature.properties.cl_age

    //verification de l'age
        
    //for (i = 0; i < peuplement.features.length; i++) {
    if (feature.properties.cl_age == null){
        cl_age = 0
    }if (feature.properties.cl_age == "JIN" || feature.properties.cl_age == "JIR"){
        cl_age = 79
    }if (feature.properties.cl_age == "VIN" || feature.properties.cl_age == "VIN50" || feature.properties.cl_age == "VIR" || feature.properties.cl_age == "VIN30"){
        cl_age = 81
    }

    //////////////////////////////////////////////////
    // VÉRIFICATION SI LE GROUPEMENT EST UNE PLANTATION
    if (feature.properties.origine == "P"){
        PLANTATION = "oui"
    }

    //////////////////////////////////////////////////
    //INSERTION DES DIFFERENTS GROUPEMENTS DE DEPOT DE SURFACE A DES LISTES, VOIR CLE DECISIONNELLE
    var DEP1_LIST = ["R","R1","R1A","R2A","R4A","R4GA","R4GS","R5S","R6S","R7T","R1AA","M1AA","M1A","1AR","8A"]
    var DEP2_LIST = ["1A","1AD","1AM","1AY","1AB","1BD","1BF","1BG","1BI","1BIM","1BIY","1BN","1BP","1BT","1Y"]
    var DEP3_LIST = ["1AA","1AAM","1AAY","1AAR"]
    var DEP4_LIST = ["2A","2AE","2AK","2B","2BD","2BE","2BEY","3AC","3AE","3AN","4GS","4GSM","4GSY","4P","5S","5SM","5SY","6S","6SM","6SY","9","9S","9A"]
    var DEP5_LIST = ["4A","4GA","4GAM","4GAR","4GAY","5A","5AM","5AY"]
    var DEP6_LIST = ["4A","4GA","4GAM","4GAR","4GAY"]
    var DEP7_LIST = ["7","7E","7T","7TM","7TY"]

    //ASSOCIATION DES CLASSES DE DRAINAGES AU TYPE DE DEPOT DE SURFACE DE LA CLE DECISIONNELLE
    var DRAIN_ARGILE_MESIQUE = ["00","10","13","16","20","21","30","31","33"]
    var DRAIN_ARGILE_HYDRIQUE = ["40","41","43","50","51","53","54","60","61","62","63"]

    //ASSOCIATION DES DEPOTS DE SURFACE A LA CLASSE DE LA CLE DECISIONNELLE 
    if (DEP1_LIST.includes(feature.properties.dep_sur)){
        SOL = 1
    }if (DEP2_LIST.includes(feature.properties.dep_sur)){
        SOL = 2
    }if (DEP3_LIST.includes(feature.properties.dep_sur)){ 
        SOL = 3
    }if (DEP4_LIST.includes(feature.properties.dep_sur)){
        SOL = 4
    }if ((DEP5_LIST.includes(feature.properties.dep_sur)) && (DRAIN_ARGILE_MESIQUE.includes(feature.properties.cl_drai))){
        SOL = 5
    }if ((DEP6_LIST.includes(feature.properties.dep_sur)) && (DRAIN_ARGILE_HYDRIQUE.includes(feature.properties.cl_drai))){
        SOL = 6
    }if (DEP7_LIST.includes(feature.properties.dep_sur)){
        SOL = 7
    }


    //////////////////////////////////////////////////////
    // PRODUCTION DE LISTES POUR LES GROUPEMENTS D'ESSENCES UTILES À LA CLÉ DÉCISIONNELLE

    //groupement resineux
    var LIST_EE = ["EN","ENEN"]
    var LIST_E_RX = ["EBEN","ENEB","ENML","MLEN","ENPB","ENRX","RXEN","ENSB","SBEN","ENTO","TOEN","EPEB","EPEP","EPML","EPPB","EPRX","EPSB","SBEP","MLEP","ENEP","ENPR","ENPI","ENSE","PBEN","PBEP","TOEP","EPPR","EPTO","EPSE","EPEN","EBEP","PREP"]
    var LIST_PGPG = ["PG","PGPG"]
    var LIST_PG_RX = ["EBPG","PGEB","ENPG","PGEN","EPPG","PGEP","MLPG","PGML","PGRX","RXPG","RXPG","PGSB","SBPG","EBPI","EPPI","MLPI","PBPI","PRPI","PGPI","PGTO","PGSE","PGEB","PGPB","PGPR","RXPI","SBPI","PIPI","PIRX","PISB","PITO","PISE","PIEN","PIEB","PIEP","PIML","PIPB","PIPR","PIPG","TOPG","TOPI"]
    var LIST_AUTRES = ["EB","EBEB","EBRX","RXEB","EBSB","SBEB","EBTO","TOEB","EBML","MLEB","MLML","MLRX","RXML","MLTO","MLSB","SBML","PBPB","PBSB","RXRX","RXSB","SBRX","RXTO","RZ","SBSB","SBTO","TOML"]
    //groupement plantation resineux
    var LIST_P_E = ["EN","ENEN","EBEN","ENEB","ENEP","EPEN","ENML","MLEN","RXEN","ENRX"]
    var LIST_P_PG = ["PG","PGPG","EBPG","PGEB","ENPG","PGEN","PGEP","EPPG","PGPR","PRPG","PGRX","RXPG","PGPB","PBPG"]  

    //groupement melange resineux
    var LIST_E_FI = ["ENEBBP","ENEBPE","ENENBP","ENENFH","ENENFI","ENENFN","ENENFX","ENENPE","ENMLBP","ENMLFH","ENMLFI","ENMLFN","ENMLFX","ENMLPE","ENPBBP","ENRXBP","ENRXFH","ENRXFI","ENRXFN","ENRXFX","ENRXPE","ENSBBP","ENSBFH","ENSBFI","ENSBFN","ENSBFX","ENSBPE","ENTOBP","ENTOFI","EPEBPE","EPENBP","EPEPBP","EPEPFX","EPEPPE","EPMLBP","EPPBBP","EPSBBP","EPRXBP","EPSBFI","EPSBPE","ENEBFH","ENEBFI","ENEBFN","ENEBFX","ENPBFH","ENPBFI","ENPBFN","ENPBFX","ENPBPE","ENTOFI","ENTOFN","ENTOFX","ENTOPE","EPEPFH","EPEPFI","EPEPFN","EPEPFX","EPEPPE","EPEBBP","EPEBFH","EPEBFI","EPEBFN","EPEBFX","EPENFH","EPENFI","EPENFN","EPENFX","EPENPE","EPMLFH","EPMLFI","EPMLFN","EPMLFX","EPMLPE","EPPBFH","EPPBFI","EPPBFN","EPPBFX","EPPBPE","EPRXFH","EPRXFI","EPRXFN","EPRXFX","EPRXPE","EPSBFI","EPSBFN","EPSBFX","EPTOBP","EPTOFI","EPTOFI","EPTOFN","EPTOFX","EPTOPE","ENEBPT","ENENPT","ENMLPT","ENRXPT","ENSBPT","EPEBPT","EPEPPT","EPSBPT","ENPBPT","ENTOPT","EPEPPT","EPENPT","EPMLPT","EPPBPT","EPRXPT","EPTOPT"]
    var LIST_PG_FI = ["EBPGBP","EBPGFI","ENPGBP","ENPGFI","ENPGFN","ENPGPE","EPPGBP","EPPGFX","EPPGPE","MLPGBP","MLPGPE","PGEBBP","PGEBFI","PGEBPE","PGENBP","PGENFH","PGENFI","PGENFN","PGENFX","PGENPE","PGEPBP","PGEPFI","PGEPPE","PGFI","PGFX","PGMLBP","PGMLPE","PGPGBP","PGPGFI","PGPGFN","PGPGFX","PGPGPE","PGRXBP","PGRXFI","PGRXFX","PGRXPE","PGSBBP","PGSBFI","PGSBPE","RXPGBP","RXPGFI","RXPGPE","SBPGBP","SBPGFI","SBPGPE","EBPGFH","ENPGFH","EPPGFH","MLPGFH","PGPGFH","RXPGFH","SBPGFH","EPPGFI","MLPGFI","EBPGFN","EPPGFN","MLPGFN","RXPGFN","SBPGFN","EBPGFX","ENPGFX","MLPGFX","RXPGFX","SBPGFX","EBPGPE","PGBP","PGEBFH","PGEPFH","PGMLFH","PGFH","PGRXFH","PGSBFH","PGMLFI","PGEBFN","PGEPFN","PGMLFN","PGFN","PGRXFH","PGSBFH","PGEBFX","PGEPFX","PGMLFX","PGSBFX","PGPE","ENPGPT","EPPGPT","MLPGPT","PGEBPT","PGENPT","PGEPPT","PGMLPT","PGPGPT","PGRXPT","PGSBPT","RXPGPT","SBPGPT","EBPGPT","PGPT"]
    var LIST_R_FI = ["EBEBBP","EBEBFI","EBEBFX","EBEBPE","EBENBP","EBENFI","EBENPE","EBEPBP","EBRXBP","EBRXPE","EBSBBP","EBSBPE","EBTOBP","EBSBFI","EBSBPA","MLENBP","MLENFH","MLENFI","MLENFN","MLENFX","MLENPE","MLEPPE","MLRXFN","MLRXFX","MLRXPE","MLSBBP","MLSBPE","MLMLBP","MLMLFH","MLMLFN","MLMLFX","MLMLPE","MLRXBP","PBEBBP","PBENBP","PBENFX","PBPBBP","PBRXBP","PBSBBP","RXEBBP","RXEBFI","RXMLBP","RXMLFI","RXMLPE","RXPBBP","RXRXBP","RXRXFH","RXRXFI","RXRXFN","RXRXFX","RXRXPE","RXSBBP","RXSBFI","RXSBFN","RXSBFX","RXSBPE","RXTOBP","RZFI","RZFX","SBEBBP","SBEBFI","SBEBPE","SBMLBP","SBMLPE","SBRXBP","SBRXFH","SBRXFI","SBRXFN","SBRXFX","SBRXPE","SBSBBP","SBSBFI","SBSBFN","SBSBFX","SBSBPE","SBTOBP","SBTOFI","SBTOPE","TOEBBP","TOEBFI","TORXBP","TORXPE","TOSBBP","TOSBFI","TOSBPE","TOTOBJ","TOTOBP","TOTOFI","TOTOPE","RXENBP","RXENFI","RXENPE","RXEPBP","SBENBP","SBENFH","SBENFI","SBENFN","SBENFX","SBENPE","SBEPBP","SBEPFI","SBEPFX","SBEPPE","TOENBP","TOENFH","EBEBPT","EBENPT","EBRXPT","EBSBPT","MLENPT","MLEPPT","MLRXPT","MLSBPT","MLMLPT","RXMLPT","RXRXPT","RXSBPT","SBEBPT","SBMLPT","SBRXPT","SBSBPT","SBTOPT","TORXPT","TOSBPT","TOTOPT","RXENPT","SBENPT","SBEPPT"]
    //groupement melange feuillu
    var LIST_FI_E = ["BPBPEN","BPBPEP","BPEOEN","BPEOEP","BPFNEN","BPPEEN","BPPEEP","FHFHEN","FIBPEN","FIPEEN","FNBPEN","FNEN","FNFNEN","FNPEEN","FXEN","FXFXEN","PEBPEN","PEBPEP","PEFNEN","PEFXEN","PEPEEN","PEPEEP","BPFHEN","BPFHEP","BPFIEN","BPFIEP","BPFNEP","BPFXEN","BPFXEP","BPEN","BPEP","FIBPEP","FIEOEN","FIEOEP","FIFHEN","FIFHEP","FIFIEN","FIFIEP","FIFNEN","FIFNEP","FIFXEN","FIFXEP","FIPEEP","FIEN","FIEP","PEEOEX","PEEOEP","PEFHEX","PEFHEP","PEFIEN","PEFIEP","PEFNEP","PEFXEP","PEEN","PEEP","BPPTEN","BPPTEP","FIPTEN","FNPTEN","PTBPEN","PTBPEP","PTFNEN","PTFXEN","PTPTEN","PTPTEP","FIPTEP","PTEOEX","PTEOEP","PTFHEX","PTFHEP","PTFIEN","PTFIEP","PTFNEP","PTFXEP","PTEN","PTEP"]
    var LIST_FI_PG = ["BPBPPG","BPFNPG","BPPEPG","BPPG","FIBPPG","FIEOPG","FIFNPG","FNPEPG","FNPG","FXFXPG","FXPG","PEBPPG","PEFNPG","PEPEPG","PEPG","BPEOPG","BPFIPG","BPFXPG","FIFIPG","FIFXPG","FIPEPG","FIPG","FXBPPG","FXEOPG","FXFIPG","FXFNPG","FXPEPG","PEEOPG","PEFIPG","PEFXPG","BPPTPG","FNPTPG","PTBPPG","PTFNPG","PTPTPG","PTPG","FIPTPG","FXPTPG","PTEOPG","PTFIPG","PTFXPG"]	 
    var LIST_FI_RX = ["BPBJEB","BPBJML","BPBJPB","BPBJPR","BPBJRX","BPBJSB","BPBJTO","BPBPEB","BPBPML","BPBPPB","BPBPPR","BPBPRX","BPBPSB","BPBPTO","BPEOEB","BPEOML","BPEOPB","BPEOPR","BPEORX","BPEOSB","BPEOTO","BPEREB","BPERML","BPERPB","BPERPR","BPERRX","BPERSB","BPERTO","BPFHEB","BPFHML","BPFHPB","BPFHPR","BPFHRX","BPFHSB","BPFHTO","BPFIEB","BPFIML","BPFIPB","BPFIPR","BPFIRX","BPFISB","BPFITO","BPFNEB","BPFNML","BPFNPB","BPFNPR","BPFNRX","BPFNSB","BPFNTO","BPFTEB","BPFTML","BPFTPB","BPFTPR","BPFTRX","BPFTSB","BPFTTO","BPFXEB","BPFXML","BPFXPB","BPFXPR","BPFXRX","BPFXSB","BPFXTO","BPPEEB","BPPEML","BPPEPB","BPPEPR","BPPERX","BPPESB","BPPETO","FHBJEB","FHBJML","FHBJPB","FHBJPR","FHBJRX","FHBJSB","FHBJTO","FHBPEB","FHBPML","FHBPPB","FHBPPR","FHBPRX","FHBPSB","FHBPTO","FHEOEB","FHEOML","FHEOPB","FHEOPR","FHEORX","FHEOSB","FHEOTO","FHEREB","FHERML","FHERPB","FHERPR","FHERRX","FHERSB","FHERTO","FHFHEB","FHFHML","FHFHPB","FHFHPR","FHFHRX","FHFHSB","FHFHTO","FHFIEB","FHFIML","FHFIPB","FHFIPR","FHFIRX","FHFISB","FHFITO","FHFNEB","FHFNML","FHFNPB","FHFNPR","FHFNRX","FHFNSB","FHFNTO","FHFTEB","FHFTML","FHFTPB","FHFTPR","FHFTRX","FHFTSB","FHFTTO","FHFXEB","FHFXML","FHFXPB","FHFXPR","FHFXRX","FHFXSB","FHFXTO","FHPEEB","FHPEML","FHPEPB","FHPEPR","FHPERX","FHPESB","FHPETO","FIBJEB","FIBJML","FIBJPB","FIBJPR","FIBJRX","FIBJSB","FIBJTO","FIBPEB","FIBPML","FIBPPB","FIBPPR","FIBPRX","FIBPSB","FIBPTO","FIEOEB","FIEOML","FIEOPB","FIEOPR","FIEORX","FIEOSB","FIEOTO","FIEREB","FIERML","FIERPB","FIERPR","FIERRX","FIERSB","FIERTO","FIFHEB","FIFHML","FIFHPB","FIFHPR","FIFHRX","FIFHSB","FIFHTO","FIFIEB","FIFIML","FIFIPB","FIFIPR","FIFIRX","FIFISB","FIFITO","FIFNEB","FIFNML","FIFNPB","FIFNPR","FIFNRX","FIFNSB","FIFNTO","FIFTEB","FIFTML","FIFTPB","FIFTPR","FIFTRX","FIFTSB","FIFTTO","FIFXEB","FIFXML","FIFXPB","FIFXPR","FIFXRX","FIFXSB","FIFXTO","FIPEEB","FIPEML","FIPEPB","FIPEPR","FIPERX","FIPESB","FIPETO","FIRZ","FNBJEB","FNBJML","FNBJPB","FNBJPR","FNBJRX","FNBJSB","FNBJTO","FNBPEB","FNBPML","FNBPPB","FNBPPR","FNBPRX","FNBPSB","FNBPTO","FNEOEB","FNEOML","FNEOPB","FNEOPR","FNEORX","FNEOSB","FNEOTO","FNEREB","FNERML","FNERPB","FNERPR","FNERRX","FNERSB","FNERTO","FNFHEB","FNFHML","FNFHPB","FNFHPR","FNFHRX","FNFHSB","FNFHTO","FNFIEB","FNFIML","FNFIPB","FNFIPR","FNFIRX","FNFISB","FNFITO","FNFNEB","FNFNML","FNFNPB","FNFNPR","FNFNRX","FNFNSB","FNFNTO","FNFTEB","FNFTML","FNFTPB","FNFTPR","FNFTRX","FNFTSB","FNFTTO","FNFXEB","FNFXML","FNFXPB","FNFXPR","FNFXRX","FNFXSB","FNFXTO","FNPEEB","FNPEML","FNPEPB","FNPEPR","FNPERX","FNPESB","FNPETO","FXBJEB","FXBJML","FXBJPB","FXBJPR","FXBJRX","FXBJSB","FXBJTO","FXBPEB","FXBPML","FXBPPB","FXBPPR","FXBPRX","FXBPSB","FXBPTO","FXEOEB","FXEOML","FXEOPB","FXEOPR","FXEORX","FXEOSB","FXEOTO","FXEREB","FXERML","FXERPB","FXERPR","FXERRX","FXERSB","FXERTO","FXFHEB","FXFHML","FXFHPB","FXFHPR","FXFHRX","FXFHSB","FXFHTO","FXFIEB","FXFIML","FXFIPB","FXFIPR","FXFIRX","FXFISB","FXFITO","FXFNEB","FXFNML","FXFNPB","FXFNPR","FXFNRX","FXFNSB","FXFNTO","FXFTEB","FXFTML","FXFTPB","FXFTPR","FXFTRX","FXFTSB","FXFTTO","FXFXEB","FXFXML","FXFXPB","FXFXPR","FXFXRX","FXFXSB","FXFXTO","FXPEEB","FXPEML","FXPEPB","FXPEPR","FXPERX","FXPESB","FXPETO","FXRZ","PEBJEB","PEBJML","PEBJPB","PEBJPR","PEBJRX","PEBJSB","PEBJTO","PEBPEB","PEBPML","PEBPPB","PEBPPR","PEBPRX","PEBPSB","PEBPTO","PEEOEB","PEEOML","PEEOPB","PEEOPR","PEEORX","PEEOSB","PEEOTO","PEEREB","PEERML","PEERPB","PEERPR","PEERRX","PEERSB","PEERTO","PEFHEB","PEFHML","PEFHPB","PEFHPR","PEFHRX","PEFHSB","PEFHTO","PEFIEB","PEFIML","PEFIPB","PEFIPR","PEFIRX","PEFISB","PEFITO","PEFNEB","PEFNML","PEFNPB","PEFNPR","PEFNRX","PEFNSB","PEFNTO","PEFTEB","PEFTML","PEFTPB","PEFTPR","PEFTRX","PEFTSB","PEFTTO","PEFXEB","PEFXML","PEFXPB","PEFXPR","PEFXRX","PEFXSB","PEFXTO","PEPEEB","PEPEML","PEPEPB","PEPEPR","PEPERX","PEPESB","PEPETO","BPPTEB","BPPTML","BPPTPB","BPPTPR","BPPTRX","BPPTSB","BPPTTO","FHPTEB","FHPTML","FHPTPB","FHPTPR","FHPTRX","FHPTSB","FHPTTO","FIPTEB","FIPTML","FIPTPB","FIPTPR","FIPTRX","FIPTSB","FIPTTO","FNPTEB","FNPTML","FNPTPB","FNPTPR","FNPTRX","FNPTSB","FNPTTO","FXPTEB","FXPTML","FXPTPB","FXPTPR","FXPTRX","FXPTSB","FXPTTO","PTBJEB","PTBJML","PTBJPB","PTBJPR","PTBJRX","PTBJSB","PTBJTO","PTBPEB","PTBPML","PTBPPB","PTBPPR","PTBPRX","PTBPSB","PTBPTO","PTEOEB","PTEOML","PTEOPB","PTEOPR","PTEORX","PTEOSB","PTEOTO","PTEREB","PTERML","PTERPB","PTERPR","PTERRX","PTERSB","PTERTO","PTFHEB","PTFHML","PTFHPB","PTFHPR","PTFHRX","PTFHSB","PTFHTO","PTFIEB","PTFIML","PTFIPB","PTFIPR","PTFIRX","PTFISB","PTFITO","PTFNEB","PTFNML","PTFNPB","PTFNPR","PTFNRX","PTFNSB","PTFNTO","PTFTEB","PTFTML","PTFTPB","PTFTPR","PTFTRX","PTFTSB","PTFTTO","PTFXEB","PTFXML","PTFXPB","PTFXPR","PTFXRX","PTFXSB","PTFXTO","PTPTEB","PTPTML","PTPTPB","PTPTPR","PTPTRX","PTPTSB","PTPTTO"]
    var LIST_AUTRES_FEU = ["BJBJEB","BJBJRX","BJBPEB","BJBPRX","BJBPSB","BJBPTO","BJEOEB","BJEORX","BJEOSB","BJEOTO","BJERRX","BJEOEN","EOBJRX","EOBPEN","EOBPRX","EOBPSB","ERBJSB","FHBPRX","FHFHML","FHFHRX","FHFHTO","FOPESB","FOFOSB","FNFXML","FNFNRX","FNFNML","FNFNSB","FNFXRX","FNFXSB","FHBPEN","FHBPEP","FHEOEN","FHEOEP","FHFHEP","FHFIEN","FHFIEP","FHFNEN","FHFNEP","FHFXEN","FHFXEP","FHPEEN","FHPEEP","FHEN","FHEP","FNBPEP","FNEOEN","FNEOEP","FNFHEN","FNFHEP","FNFIEN","FNFIEP","FNFNEP","FNFXEN","FNFXEP","FNPEEP","FNEP","FXBPEX","FXBPEP","FXEOEX","FXEOEP","FXFHEX","FXFHEP","FXFIEN","FXFIEP","FXFNEN","FXFNEP","FXFXEP","FXPEEX","FXPEEP","FXEP","FNFNPG","FNBPPG","FNEOPG","FNFIPG","FNFXPG","FOPTSB","FHPTEN","FHPTEP","FNPTEP","FXPTEX","FXPTEP"]
    //groupement Provenant de melange feuillu mais en plantation
    var LIST_P_R_FI =["EBBP","EBFN","EBFX","EBPE","MLFN","MLFX","MLRX","PBFX","PRFX","RXRZFX","RZBP","RZFI","RZFN","RZFX","RZPE","EBPT","RZPT"] 
    var LIST_P_FI_RX =["PERZ","PEEB","FXRZ","FXPR","FXML","FXPB","FXFXEB","FXEB","FNRZ","FNML","FNFXRX","FNFNRX","FNEB","FIRZ","BPEB","PTRZ","PTEB"]
    //groupement plantation melange feuillu et resineux
    var LIST_P_E_F =["ENBP","ENFI","ENFN","ENFH","ENFX","ENPE","ENEBBP","ENEBFI","ENEBFN","ENEBFH","ENEBFX","ENEBPE","ENMLBP","ENMLFI","ENMLFN","ENMLFH","ENMLFX","ENMLPE","ENPT","ENEBPT","ENMLPT"]
    var LIST_P_mel_res = ["ENPGBP","ENPGFH","ENPGFI","ENPGFN","ENPGFX","ENPGPE","EBPGBP","EBPGFH","EBPGFI","EBPGFN","EBPGFX","EBPGPE","RXPGBP","RXPGFH","RXPGFI","RXPGFN","RXPGFX","RXPGPE","MLPGBP","MLPGFH","MLPGFI","MLPGFN","MLPGFX","MLPGPE","PGBP","PGFI","PGFN","PGFX","PGPE","ENPGPT","EBPGPT","RXPGPT","MLPGPT","PGPT"]
    var LIST_P_mel_feu_E = ["BPEN","FIEN","FNEN","FNFXEN","FXEN","FXFXEN","FXFXEP","PEEN","BPEP","FIEP","FNEP","FNFXEP","FXEP","PEEP","PTEN","PTEP"]
    var LIST_P_mel_feu_PG = ["BPPG","FIPG","FHPG","FNPG","FXFXPG","FXPG","PEPG","BPBPPG","FIFIPG","BPFIPG","PEBBPG","BBPEPG","PTPG","PTBBPG","BBPTPG"]

    //groupement feuillu
    var LIST_PE = ["PE","PEPE","PT","PTPT"]
    var LIST_BB = ["BP","BPBP"]
    var LIST_FI = ["BPBJ","BPEO","BPFH","BPFI","BPFN","BPFX","BPFX","BPPE","FIBP","FIEO","FIFH","FIFI","FIFN","FIFX","FIPE","FNFX","Fx","FXEO","FXFH","FXFI","FXFI","FXFN","FXFX","FXFX","FXPE","FXPE","EBP","EEO","EFH","EFI","EFN","EFX","EFO","EFX","FZFX","FZ","H","BPPT","FIPT","FXPT","FXPT"]
    var LIST_AUTRES_FEU = ["BJBJ","BJBP","BJEO","BJES","BJER","BJFI","BJFX","BJPE","BJ","EOBJ","EOBP","EoEo","EOES","EOER","EOFI","EOFx","EOPE","EO","ERBJ","ERBP","EREO","ERES","ERER","ERFI","ERFX","ERPE","ER","ESES","ESBP","ESBJ","ESES","ESER","ESFI","ESFX","ESPE","ES","PO","BJPT","EOPT","ERPT","ESPT"]
    var LIST_FNC = ["FNFN","FNFH","FNFI","FNFO","FNFX","FNEO","FHBJ","FHBP","FHEO","FHES","FHER","FHFH","FHFI","FHFN","FHFX","FHPE","Fh","FOFO","FOPE","FOEO","FOES","FOER","FOFH","FOFI","FOFN","FOFX","FOPE","Fo","FNBP","FNPE","FNFI","FHPT","FOPT","FOPT","FNPT"]

    //groupement plantation indeterminer
    var LIST_R_P_IND = ["RZ","RZRX","RXRZ"]
    var LIST_M_P_IND = ["RZRXFX","RZRXFN","RZFXFN","RZFX","RZFNFX","RZFN","RZFI","RXFXRZ","FXRZ"]

    //////////////////////////////////////
    //ASSOCIATION DES GROUPEMENT D'ESSENCES DU SHP AUX LISTE DES GROUPEMENTS CI-DESSUS, VOIR CLE DECISIONNELLE

    //essence resineux
    if (feature.properties.type_couv == "R"){ 
        if (PLANTATION == "non"){
            if (LIST_EE.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "EE"
            }if (LIST_E_RX.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "E(Rx)"
            }if (LIST_PGPG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "PGPG"
            }if (LIST_PG_RX.includes(feature.properties.gr_ess)){ 
                REGROUPEMENT = "PG(Rx)"
            }if (LIST_AUTRES.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "Autres"
            }if (feature.properties.gr_ess == null){
                REGROUPEMENT = "Sans_Res"
            }

        //plantation resineux
        }if (PLANTATION == "oui"){
            if (LIST_P_E.includes(feature.properties.gr_ess)){   
                REGROUPEMENT = "P_E"
            }if (LIST_P_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_PG"
            }if (LIST_R_P_IND.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_E"
            }
        }

    //essence melange
    }if (feature.properties.type_couv == "M"){	
        if (PLANTATION == "non"){	
            //melange resineux
            if (LIST_E_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "E(Fi)"
            }if (LIST_PG_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "PG(Fi)"
            }if (LIST_R_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"  
            //melange feuillu
            }if (LIST_FI_E.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(E)"
            }if (LIST_FI_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(PG)"	
            }if (LIST_FI_RX.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(Rx)"
            }if (LIST_AUTRES_FEU.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "Autres_Feuillus"
            }if (feature.properties.gr_ess == null){
                REGROUPEMENT = "Sans_Mel"
            }   
        //plantation melange	
        }if (PLANTATION == "oui"){
            if (LIST_P_R_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"
            }if (LIST_P_FI_RX.includes(feature.properties.gr_ess)){ 
                REGROUPEMENT = "FI(Rx)"
            }if (LIST_P_E_F.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_E_F"
            }if (LIST_P_mel_res.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_res" 
            }if (LIST_P_mel_feu_E.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_feu_E"	
            }if (LIST_P_mel_feu_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_feu_PG"
            }if (LIST_M_P_IND.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"
            }
        }

    //essence feuillu
    }if (feature.properties.type_couv == "F"){		
        if (LIST_PE.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "PE"
        }if (LIST_BB.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "BB"
        }if (LIST_FI.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "FI" 
        }if (LIST_AUTRES_FEU.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "Autres_feuillus" 
        }if (LIST_FNC.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "FNC" 
        }if (feature.properties.gr_ess == null){
            REGROUPEMENT = "Sans_Feu"  
        }
    }
        
    ////////////////////////////////////////////////////////////////////////
    //ASSOCIATION DE LA SÉVIRITÉ DU FEU SELON LES CARACTÉRISITQUES DE L'ENTITÉE
    //////// SI FEU SEVERE

    /////if (CLASSES == "severe" && (feature.properties.origine == null || feature.properties.origine == 'P')){

    ////Association au potentiel resineux
    //Regroupement EE
    if ((feature.properties.origine == null) || (feature.properties.origine == 'P')){
        if (REGROUPEMENT == "EE"){ 
            if (cl_age < 50){
                regen = "mauvais" 
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if ([1,3,4,6,7].includes(SOL)){  
                        regen = "moyen"
                    }if ([2,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,3,4,6,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,4,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }
            }
                
        //Regroupement E(Rx)	  
        }if (REGROUPEMENT == "E(Rx)"){  
            if (cl_age < 50){
                regen = "mauvais" 
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if ([1,3,4,6,7].includes(SOL)){
                        regen = "moyen"    
                    }if ([2,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,6].includes(SOL)){
                        regen = "moyen" 
                    }if (SOL == 5){
                        regen = "bon" 	
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,4,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }
            }

        //Regroupement PGPG
        }if (REGROUPEMENT == "PGPG"){  
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([3,6].includes(SOL)){
                        regen = "moyen"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if (SOL == 3){
                        regen = "moyen" 
                    }if ([1,2,4,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }
            }

        //Regroupement PG(Rx) 
        }if (REGROUPEMENT == "PG(Rx)"){ 
            if (cl_age < 30){
                regen = "mauvais" 
            }if ((cl_age >= 30) && (cl_age < 50)){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([3,6].includes(SOL)){
                        regen = "moyen"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,2,3,4,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([3,6].includes(SOL)){
                        regen = "moyen"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,2,3,4,5,6].includes(SOL)){
                        regen = "bon" 	 
                    }
                }
            }

        //Regroupement Autres	
        }if (REGROUPEMENT == "Autres"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais"   
            }

        //Regroupement plantation epinettes
        }if (REGROUPEMENT == "P_E"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }

        //Regroupement plantation pin gris	
        }if (REGROUPEMENT == "P_PG"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if (SOL == 7){
                    regen = "mauvais" 
                }if ([3,6].includes(SOL)){
                    regen = "moyen"    
                }if ([1,2,4,5].includes(SOL)){
                    regen = "bon" 	 	
                }
            }

        //Regroupement sans regroupement resineux
        }if (REGROUPEMENT == "Sans_Res"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais"      
            }
            
        ////Association au potentiel melange resineux
        //regroupement E(Fi)
        }if (REGROUPEMENT == "E(Fi)"){
            if (cl_age < 50){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 50){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if ([1,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "bon" 				
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,3,4,6,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "bon" 				    			
                    }
                }
            }

        //Regroupement PG(Fi)
        }if (REGROUPEMENT == "PG(Fi)"){
            if (cl_age < 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }if (cl_age >= 30){
                if (SOL == 7){
                    regen = "mauvais" 
                }if ([1,2,3,4,5,6].includes(SOL)){
                    regen = "bon" 			
                }
            }

        //Regroupement "R(Fi)"	
        }if (REGROUPEMENT == "R(Fi)"){
            if (cl_age < 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen"    
                }
            }if (cl_age >= 30){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }

        //Regroupement Plantation E et F 
        }if (REGROUPEMENT == "P_E_F"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if (SOL == 7){
                    regen = "mauvais" 
                }if ([1,2,3,4,6].includes(SOL)){
                    regen = "moyen" 
                }if (SOL == 5){
                    regen = "bon" 
                }
            }

        //Regroupement plantation melange resineux
        }if (REGROUPEMENT == "P_melange_res"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([3,6].includes(SOL)){
                    regen = "moyen"    
                }if ([2,4,5].includes(SOL)){
                    regen = "bon"    
                }
            }

        ////Association melange sans
        }if (REGROUPEMENT == "Sans_Mel"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais" 
            }

        ////Association au potentiel melange feuillu
        //Regroupement FI(E)
        }if (REGROUPEMENT == "FI(E)"){
            if (cl_age < 50){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4].includes(SOL)){
                        regen = "moyen" 
                    }if ([5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen"  
                    }
                }
            }if ((cl_age >= 50) && (cl_age <= 70)){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if (SOL == 1){
                        regen = "moyen" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,6].includes(SOL)){
                        regen = "moyen" 
                    }if (SOL == 5){
                        regen = "bon" 		 
                    }
                }
            }if (cl_age > 70){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,4].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if (SOL == 4){
                        regen = "moyen" 	
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "bon" 	 
                    }
                }
            }
            
        //Regroupement FI(PG)	 
        }if (REGROUPEMENT == "FI(PG)"){  
            if (cl_age < 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }if (cl_age >= 30){     
                if (SOL == 7){
                    regen = "mauvais" 
                }if (SOL == 1){
                    regen = "moyen"    
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "bon" 
                }
            }

        //Regroupement FI(Rx)  
        }if (REGROUPEMENT == "FI(Rx)"){  
            if (cl_age < 30){	 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,4,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 30){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 	
                    }
                }if (feature.properties.cl_dens == "C" || feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,6].includes(SOL)){
                        regen = "moyen" 	
                    }if (SOL == 5){
                        regen = "bon" 
                    }
                }
            }

        //Regroupement autres feuillus  (melange)
        }if (REGROUPEMENT == "Autres_Feuillus"){
            regen = "mauvais" 
        
        //Regroupement plantation melange feuillu - epinette 
        }if (REGROUPEMENT == "P_melange_feu_E"){ 
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais"  
                }if ([2,3,4,5,6].includes(SOL)){	
                    regen = "moyen" 
                }
            }

        //Regroupement plantation melange feuillu - pin gris   
        }if (REGROUPEMENT == "P_melange_feu_PG"){ 
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if (SOL == 7){
                    regen = "mauvais"  
                }if ([1,3,6].includes(SOL)){
                    regen = "moyen"    
                }if ([2,4,5].includes(SOL)){
                    regen = "bon"   
                }
            }          
            
        ////Association au potentiel feuillu
        //Regroupement PE
        }if (REGROUPEMENT == "PE"){
            if ([1,7].includes(SOL)){
                regen = "mauvais" 
            }if (SOL == 2){
                regen = "moyen" 
            }if ([3,4,5,6].includes(SOL)){
                regen = "bon"  
            }

        //Regroupement BB
        }if (REGROUPEMENT == "BB"){
            if (cl_age < 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([1,3].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    regen = "mauvais" 	
                }
            }if (cl_age >= 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    regen = "mauvais" 
                }
            }
            
        //Regroupement FI
        }if (REGROUPEMENT == "FI"){
            if (cl_age < 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,2,3,4,6].includes(SOL)){
                        regen = "moyen" 
                    }if (SOL == 5){
                        regen = "bon" 	 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen"  
                    }
                }
            }
            
        //Regroupement autre feuillus
        }if (REGROUPEMENT == "Autres_Feuillus"){
            regen = "mauvais" 
        
        //Regroupement FNC
        }if (REGROUPEMENT == "FNC"){
            regen = "mauvais" 

        //Regroupement Sans
        }if (REGROUPEMENT == "Sans_Feu"){
            if (SOL == 7){
                regen = "mauvais" 
            }if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas"   
            }
        }
    }
    
    //////////////////
    //CREATION LISTE INTRUS DANS LE GROUPE D'ESSENCE, VOIR CLE DECISIONNELLE
    var liste_intrus = ["AF","AL","ANT","BR","CBA","CEF","CHT","CPR","CPT","CT","DH","DS","EAU","ENS","ES","FR","GR","ILE","INO","LTE","NF","P","PRR","RPS","RO"] 

    //CREATION LISTE POUR IMPRODUCTif (ET NON FORESTIER
    var LIST_IMPROD = ["AL","DH","DS"]
    var LIST_NON_FOR = ["IMP","ANT","NF","AF","ILE","EAU","INO","A","GR","LTE","RO","NX","AEP","CFO","DEP"]

    //SI INTRUS DANS CO_TER OU ORIGINE, DIFFERENT DE P et GR_ESS NON VIDE ){ REGEN NE SAIS PAS 
    if (((liste_intrus.includes(feature.properties.origine)) || (liste_intrus.includes(co_ter))) && ((feature.properties.gr_ess != null) && (feature.properties.origine != 'P'))){
        regen = "ne sais pas"

    //SI ORIGINE VIDE ET GR_ESS VIDE ){ REGEN NE SAIS PAS   
    }if ((feature.properties.origine != null) && (feature.properties.gr_ess == null)){
        regen = "ne sais pas"

    //POUR TOUTE PLANTATION, SI CLASSE D'AGE INFERIEUR OU EGALE A 30, REGENERATION EST FAIBLE. DECISION PAR OSVALDO
    }if (((feature.properties.origine == 'P') || (feature.properties.origine == 'PRR')) && ((cl_age <= 30) && (feature.properties.gr_ess != null))){
        regen = "mauvais"

    //Regeneration CO_TER
    }if ((feature.properties.co_ter != null) && (feature.properties.gr_ess == null)){
        if (LIST_IMPROD.includes(feature.properties.co_ter)){
            regen = "mauvais"
        }if (LIST_NON_FOR.includes(feature.properties.co_ter)){
            regen = "NA"
        }
    }

    if (regen == "bon"){
        bon += 1
        return vert
    }if (regen == "moyen"){
        moyen += 1
        return jaune
    }if (regen == "mauvais"){
        mauvais += 1
        return rouge
    }if (regen == "ne sais pas"){
        nsp += 1
        return gris
    }if (regen == "NA"){
        na += 1
        return blanc
    } else {
        return blanc
    }
}

function peu_severe(feature){
    var SOL = 0
    var PLANTATION = "non"
    var REGROUPEMENT = "ind"
    var regen = "ind"
    var cl_age = feature.properties.cl_age

    //verification de l'age
        
    if (feature.properties.cl_age == null){
        cl_age = 0
    }if (feature.properties.cl_age == "JIN" || feature.properties.cl_age == "JIR"){
        cl_age = 79
    }if (feature.properties.cl_age == "VIN" || feature.properties.cl_age == "VIN50" || feature.properties.cl_age == "VIR" || feature.properties.cl_age == "VIN30"){
        cl_age = 81
    }

    //////////////////////////////////////////////////
    // VÉRIFICATION SI LE GROUPEMENT EST UNE PLANTATION
    if (feature.properties.origine == "P"){
        PLANTATION = "oui"
    }
    //////////////////////////////////////////////////
    //INSERTION DES DIFFERENTS GROUPEMENTS DE DEPOT DE SURFACE A DES LISTES, VOIR CLE DECISIONNELLE
    var DEP1_LIST = ["R","R1","R1A","R2A","R4A","R4GA","R4GS","R5S","R6S","R7T","R1AA","M1AA","M1A","1AR","8A"]
    var DEP2_LIST = ["1A","1AD","1AM","1AY","1AB","1BD","1BF","1BG","1BI","1BIM","1BIY","1BN","1BP","1BT","1Y"]
    var DEP3_LIST = ["1AA","1AAM","1AAY","1AAR"]
    var DEP4_LIST = ["2A","2AE","2AK","2B","2BD","2BE","2BEY","3AC","3AE","3AN","4GS","4GSM","4GSY","4P","5S","5SM","5SY","6S","6SM","6SY","9","9S","9A"]
    var DEP5_LIST = ["4A","4GA","4GAM","4GAR","4GAY","5A","5AM","5AY"]
    var DEP6_LIST = ["4A","4GA","4GAM","4GAR","4GAY"]
    var DEP7_LIST = ["7","7E","7T","7TM","7TY"]

    //ASSOCIATION DES CLASSES DE DRAINAGES AU TYPE DE DEPOT DE SURFACE DE LA CLE DECISIONNELLE
    var DRAIN_ARGILE_MESIQUE = ["00","10","13","16","20","21","30","31","33"]
    var DRAIN_ARGILE_HYDRIQUE = ["40","41","43","50","51","53","54","60","61","62","63"]

    //ASSOCIATION DES DEPOTS DE SURFACE A LA CLASSE DE LA CLE DECISIONNELLE 
    if (DEP1_LIST.includes(feature.properties.dep_sur)){
        SOL = 1
    }if (DEP2_LIST.includes(feature.properties.dep_sur)){
        SOL = 2
    }if (DEP3_LIST.includes(feature.properties.dep_sur)){ 
        SOL = 3 
    }if (DEP4_LIST.includes(feature.properties.dep_sur)){
        SOL = 4
    }if ((DEP5_LIST.includes(feature.properties.dep_sur)) && (DRAIN_ARGILE_MESIQUE.includes(feature.properties.cl_drai))){
        SOL = 5
    }if ((DEP6_LIST.includes(feature.properties.dep_sur)) && (DRAIN_ARGILE_HYDRIQUE.includes(feature.properties.cl_drai))){
        SOL = 6
    }if (DEP7_LIST.includes(feature.properties.dep_sur)){
        SOL = 7
    }


    //////////////////////////////////////////////////////
    // PRODUCTION DE LISTES POUR LES GROUPEMENTS D'ESSENCES UTILES À LA CLÉ DÉCISIONNELLE

    //groupement resineux
    var LIST_EE = ["EN","ENEN"]
    var LIST_E_RX = ["EBEN","ENEB","ENML","MLEN","ENPB","ENRX","RXEN","ENSB","SBEN","ENTO","TOEN","EPEB","EPEP","EPML","EPPB","EPRX","EPSB","SBEP","MLEP","ENEP","ENPR","ENPI","ENSE","PBEN","PBEP","TOEP","EPPR","EPTO","EPSE","EPEN","EBEP","PREP"]
    var LIST_PGPG = ["PG","PGPG"]
    var LIST_PG_RX = ["EBPG","PGEB","ENPG","PGEN","EPPG","PGEP","MLPG","PGML","PGRX","RXPG","RXPG","PGSB","SBPG","EBPI","EPPI","MLPI","PBPI","PRPI","PGPI","PGTO","PGSE","PGEB","PGPB","PGPR","RXPI","SBPI","PIPI","PIRX","PISB","PITO","PISE","PIEN","PIEB","PIEP","PIML","PIPB","PIPR","PIPG","TOPG","TOPI"]
    var LIST_AUTRES = ["EB","EBEB","EBRX","RXEB","EBSB","SBEB","EBTO","TOEB","EBML","MLEB","MLML","MLRX","RXML","MLTO","MLSB","SBML","PBPB","PBSB","RXRX","RXSB","SBRX","RXTO","RZ","SBSB","SBTO","TOML"]
    //groupement plantation resineux
    var LIST_P_E = ["EN","ENEN","EBEN","ENEB","ENEP","EPEN","ENML","MLEN","RXEN","ENRX"]
    var LIST_P_PG = ["PG","PGPG","EBPG","PGEB","ENPG","PGEN","PGEP","EPPG","PGPR","PRPG","PGRX","RXPG","PGPB","PBPG"]  

    //groupement melange resineux
    var LIST_E_FI = ["ENEBBP","ENEBPE","ENENBP","ENENFH","ENENFI","ENENFN","ENENFX","ENENPE","ENMLBP","ENMLFH","ENMLFI","ENMLFN","ENMLFX","ENMLPE","ENPBBP","ENRXBP","ENRXFH","ENRXFI","ENRXFN","ENRXFX","ENRXPE","ENSBBP","ENSBFH","ENSBFI","ENSBFN","ENSBFX","ENSBPE","ENTOBP","ENTOFI","EPEBPE","EPENBP","EPEPBP","EPEPFX","EPEPPE","EPMLBP","EPPBBP","EPSBBP","EPRXBP","EPSBFI","EPSBPE","ENEBFH","ENEBFI","ENEBFN","ENEBFX","ENPBFH","ENPBFI","ENPBFN","ENPBFX","ENPBPE","ENTOFI","ENTOFN","ENTOFX","ENTOPE","EPEPFH","EPEPFI","EPEPFN","EPEPFX","EPEPPE","EPEBBP","EPEBFH","EPEBFI","EPEBFN","EPEBFX","EPENFH","EPENFI","EPENFN","EPENFX","EPENPE","EPMLFH","EPMLFI","EPMLFN","EPMLFX","EPMLPE","EPPBFH","EPPBFI","EPPBFN","EPPBFX","EPPBPE","EPRXFH","EPRXFI","EPRXFN","EPRXFX","EPRXPE","EPSBFI","EPSBFN","EPSBFX","EPTOBP","EPTOFI","EPTOFI","EPTOFN","EPTOFX","EPTOPE","ENEBPT","ENENPT","ENMLPT","ENRXPT","ENSBPT","EPEBPT","EPEPPT","EPSBPT","ENPBPT","ENTOPT","EPEPPT","EPENPT","EPMLPT","EPPBPT","EPRXPT","EPTOPT"]
    var LIST_PG_FI = ["EBPGBP","EBPGFI","ENPGBP","ENPGFI","ENPGFN","ENPGPE","EPPGBP","EPPGFX","EPPGPE","MLPGBP","MLPGPE","PGEBBP","PGEBFI","PGEBPE","PGENBP","PGENFH","PGENFI","PGENFN","PGENFX","PGENPE","PGEPBP","PGEPFI","PGEPPE","PGFI","PGFX","PGMLBP","PGMLPE","PGPGBP","PGPGFI","PGPGFN","PGPGFX","PGPGPE","PGRXBP","PGRXFI","PGRXFX","PGRXPE","PGSBBP","PGSBFI","PGSBPE","RXPGBP","RXPGFI","RXPGPE","SBPGBP","SBPGFI","SBPGPE","EBPGFH","ENPGFH","EPPGFH","MLPGFH","PGPGFH","RXPGFH","SBPGFH","EPPGFI","MLPGFI","EBPGFN","EPPGFN","MLPGFN","RXPGFN","SBPGFN","EBPGFX","ENPGFX","MLPGFX","RXPGFX","SBPGFX","EBPGPE","PGBP","PGEBFH","PGEPFH","PGMLFH","PGFH","PGRXFH","PGSBFH","PGMLFI","PGEBFN","PGEPFN","PGMLFN","PGFN","PGRXFH","PGSBFH","PGEBFX","PGEPFX","PGMLFX","PGSBFX","PGPE","ENPGPT","EPPGPT","MLPGPT","PGEBPT","PGENPT","PGEPPT","PGMLPT","PGPGPT","PGRXPT","PGSBPT","RXPGPT","SBPGPT","EBPGPT","PGPT"]
    var LIST_R_FI = ["EBEBBP","EBEBFI","EBEBFX","EBEBPE","EBENBP","EBENFI","EBENPE","EBEPBP","EBRXBP","EBRXPE","EBSBBP","EBSBPE","EBTOBP","EBSBFI","EBSBPA","MLENBP","MLENFH","MLENFI","MLENFN","MLENFX","MLENPE","MLEPPE","MLRXFN","MLRXFX","MLRXPE","MLSBBP","MLSBPE","MLMLBP","MLMLFH","MLMLFN","MLMLFX","MLMLPE","MLRXBP","PBEBBP","PBENBP","PBENFX","PBPBBP","PBRXBP","PBSBBP","RXEBBP","RXEBFI","RXMLBP","RXMLFI","RXMLPE","RXPBBP","RXRXBP","RXRXFH","RXRXFI","RXRXFN","RXRXFX","RXRXPE","RXSBBP","RXSBFI","RXSBFN","RXSBFX","RXSBPE","RXTOBP","RZFI","RZFX","SBEBBP","SBEBFI","SBEBPE","SBMLBP","SBMLPE","SBRXBP","SBRXFH","SBRXFI","SBRXFN","SBRXFX","SBRXPE","SBSBBP","SBSBFI","SBSBFN","SBSBFX","SBSBPE","SBTOBP","SBTOFI","SBTOPE","TOEBBP","TOEBFI","TORXBP","TORXPE","TOSBBP","TOSBFI","TOSBPE","TOTOBJ","TOTOBP","TOTOFI","TOTOPE","RXENBP","RXENFI","RXENPE","RXEPBP","SBENBP","SBENFH","SBENFI","SBENFN","SBENFX","SBENPE","SBEPBP","SBEPFI","SBEPFX","SBEPPE","TOENBP","TOENFH","EBEBPT","EBENPT","EBRXPT","EBSBPT","MLENPT","MLEPPT","MLRXPT","MLSBPT","MLMLPT","RXMLPT","RXRXPT","RXSBPT","SBEBPT","SBMLPT","SBRXPT","SBSBPT","SBTOPT","TORXPT","TOSBPT","TOTOPT","RXENPT","SBENPT","SBEPPT"]
    //groupement melange feuillu
    var LIST_FI_E = ["BPBPEN","BPBPEP","BPEOEN","BPEOEP","BPFNEN","BPPEEN","BPPEEP","FHFHEN","FIBPEN","FIPEEN","FNBPEN","FNEN","FNFNEN","FNPEEN","FXEN","FXFXEN","PEBPEN","PEBPEP","PEFNEN","PEFXEN","PEPEEN","PEPEEP","BPFHEN","BPFHEP","BPFIEN","BPFIEP","BPFNEP","BPFXEN","BPFXEP","BPEN","BPEP","FIBPEP","FIEOEN","FIEOEP","FIFHEN","FIFHEP","FIFIEN","FIFIEP","FIFNEN","FIFNEP","FIFXEN","FIFXEP","FIPEEP","FIEN","FIEP","PEEOEX","PEEOEP","PEFHEX","PEFHEP","PEFIEN","PEFIEP","PEFNEP","PEFXEP","PEEN","PEEP","BPPTEN","BPPTEP","FIPTEN","FNPTEN","PTBPEN","PTBPEP","PTFNEN","PTFXEN","PTPTEN","PTPTEP","FIPTEP","PTEOEX","PTEOEP","PTFHEX","PTFHEP","PTFIEN","PTFIEP","PTFNEP","PTFXEP","PTEN","PTEP"]
    var LIST_FI_PG = ["BPBPPG","BPFNPG","BPPEPG","BPPG","FIBPPG","FIEOPG","FIFNPG","FNPEPG","FNPG","FXFXPG","FXPG","PEBPPG","PEFNPG","PEPEPG","PEPG","BPEOPG","BPFIPG","BPFXPG","FIFIPG","FIFXPG","FIPEPG","FIPG","FXBPPG","FXEOPG","FXFIPG","FXFNPG","FXPEPG","PEEOPG","PEFIPG","PEFXPG","BPPTPG","FNPTPG","PTBPPG","PTFNPG","PTPTPG","PTPG","FIPTPG","FXPTPG","PTEOPG","PTFIPG","PTFXPG"]	 
    var LIST_FI_RX = ["BPBJEB","BPBJML","BPBJPB","BPBJPR","BPBJRX","BPBJSB","BPBJTO","BPBPEB","BPBPML","BPBPPB","BPBPPR","BPBPRX","BPBPSB","BPBPTO","BPEOEB","BPEOML","BPEOPB","BPEOPR","BPEORX","BPEOSB","BPEOTO","BPEREB","BPERML","BPERPB","BPERPR","BPERRX","BPERSB","BPERTO","BPFHEB","BPFHML","BPFHPB","BPFHPR","BPFHRX","BPFHSB","BPFHTO","BPFIEB","BPFIML","BPFIPB","BPFIPR","BPFIRX","BPFISB","BPFITO","BPFNEB","BPFNML","BPFNPB","BPFNPR","BPFNRX","BPFNSB","BPFNTO","BPFTEB","BPFTML","BPFTPB","BPFTPR","BPFTRX","BPFTSB","BPFTTO","BPFXEB","BPFXML","BPFXPB","BPFXPR","BPFXRX","BPFXSB","BPFXTO","BPPEEB","BPPEML","BPPEPB","BPPEPR","BPPERX","BPPESB","BPPETO","FHBJEB","FHBJML","FHBJPB","FHBJPR","FHBJRX","FHBJSB","FHBJTO","FHBPEB","FHBPML","FHBPPB","FHBPPR","FHBPRX","FHBPSB","FHBPTO","FHEOEB","FHEOML","FHEOPB","FHEOPR","FHEORX","FHEOSB","FHEOTO","FHEREB","FHERML","FHERPB","FHERPR","FHERRX","FHERSB","FHERTO","FHFHEB","FHFHML","FHFHPB","FHFHPR","FHFHRX","FHFHSB","FHFHTO","FHFIEB","FHFIML","FHFIPB","FHFIPR","FHFIRX","FHFISB","FHFITO","FHFNEB","FHFNML","FHFNPB","FHFNPR","FHFNRX","FHFNSB","FHFNTO","FHFTEB","FHFTML","FHFTPB","FHFTPR","FHFTRX","FHFTSB","FHFTTO","FHFXEB","FHFXML","FHFXPB","FHFXPR","FHFXRX","FHFXSB","FHFXTO","FHPEEB","FHPEML","FHPEPB","FHPEPR","FHPERX","FHPESB","FHPETO","FIBJEB","FIBJML","FIBJPB","FIBJPR","FIBJRX","FIBJSB","FIBJTO","FIBPEB","FIBPML","FIBPPB","FIBPPR","FIBPRX","FIBPSB","FIBPTO","FIEOEB","FIEOML","FIEOPB","FIEOPR","FIEORX","FIEOSB","FIEOTO","FIEREB","FIERML","FIERPB","FIERPR","FIERRX","FIERSB","FIERTO","FIFHEB","FIFHML","FIFHPB","FIFHPR","FIFHRX","FIFHSB","FIFHTO","FIFIEB","FIFIML","FIFIPB","FIFIPR","FIFIRX","FIFISB","FIFITO","FIFNEB","FIFNML","FIFNPB","FIFNPR","FIFNRX","FIFNSB","FIFNTO","FIFTEB","FIFTML","FIFTPB","FIFTPR","FIFTRX","FIFTSB","FIFTTO","FIFXEB","FIFXML","FIFXPB","FIFXPR","FIFXRX","FIFXSB","FIFXTO","FIPEEB","FIPEML","FIPEPB","FIPEPR","FIPERX","FIPESB","FIPETO","FIRZ","FNBJEB","FNBJML","FNBJPB","FNBJPR","FNBJRX","FNBJSB","FNBJTO","FNBPEB","FNBPML","FNBPPB","FNBPPR","FNBPRX","FNBPSB","FNBPTO","FNEOEB","FNEOML","FNEOPB","FNEOPR","FNEORX","FNEOSB","FNEOTO","FNEREB","FNERML","FNERPB","FNERPR","FNERRX","FNERSB","FNERTO","FNFHEB","FNFHML","FNFHPB","FNFHPR","FNFHRX","FNFHSB","FNFHTO","FNFIEB","FNFIML","FNFIPB","FNFIPR","FNFIRX","FNFISB","FNFITO","FNFNEB","FNFNML","FNFNPB","FNFNPR","FNFNRX","FNFNSB","FNFNTO","FNFTEB","FNFTML","FNFTPB","FNFTPR","FNFTRX","FNFTSB","FNFTTO","FNFXEB","FNFXML","FNFXPB","FNFXPR","FNFXRX","FNFXSB","FNFXTO","FNPEEB","FNPEML","FNPEPB","FNPEPR","FNPERX","FNPESB","FNPETO","FXBJEB","FXBJML","FXBJPB","FXBJPR","FXBJRX","FXBJSB","FXBJTO","FXBPEB","FXBPML","FXBPPB","FXBPPR","FXBPRX","FXBPSB","FXBPTO","FXEOEB","FXEOML","FXEOPB","FXEOPR","FXEORX","FXEOSB","FXEOTO","FXEREB","FXERML","FXERPB","FXERPR","FXERRX","FXERSB","FXERTO","FXFHEB","FXFHML","FXFHPB","FXFHPR","FXFHRX","FXFHSB","FXFHTO","FXFIEB","FXFIML","FXFIPB","FXFIPR","FXFIRX","FXFISB","FXFITO","FXFNEB","FXFNML","FXFNPB","FXFNPR","FXFNRX","FXFNSB","FXFNTO","FXFTEB","FXFTML","FXFTPB","FXFTPR","FXFTRX","FXFTSB","FXFTTO","FXFXEB","FXFXML","FXFXPB","FXFXPR","FXFXRX","FXFXSB","FXFXTO","FXPEEB","FXPEML","FXPEPB","FXPEPR","FXPERX","FXPESB","FXPETO","FXRZ","PEBJEB","PEBJML","PEBJPB","PEBJPR","PEBJRX","PEBJSB","PEBJTO","PEBPEB","PEBPML","PEBPPB","PEBPPR","PEBPRX","PEBPSB","PEBPTO","PEEOEB","PEEOML","PEEOPB","PEEOPR","PEEORX","PEEOSB","PEEOTO","PEEREB","PEERML","PEERPB","PEERPR","PEERRX","PEERSB","PEERTO","PEFHEB","PEFHML","PEFHPB","PEFHPR","PEFHRX","PEFHSB","PEFHTO","PEFIEB","PEFIML","PEFIPB","PEFIPR","PEFIRX","PEFISB","PEFITO","PEFNEB","PEFNML","PEFNPB","PEFNPR","PEFNRX","PEFNSB","PEFNTO","PEFTEB","PEFTML","PEFTPB","PEFTPR","PEFTRX","PEFTSB","PEFTTO","PEFXEB","PEFXML","PEFXPB","PEFXPR","PEFXRX","PEFXSB","PEFXTO","PEPEEB","PEPEML","PEPEPB","PEPEPR","PEPERX","PEPESB","PEPETO","BPPTEB","BPPTML","BPPTPB","BPPTPR","BPPTRX","BPPTSB","BPPTTO","FHPTEB","FHPTML","FHPTPB","FHPTPR","FHPTRX","FHPTSB","FHPTTO","FIPTEB","FIPTML","FIPTPB","FIPTPR","FIPTRX","FIPTSB","FIPTTO","FNPTEB","FNPTML","FNPTPB","FNPTPR","FNPTRX","FNPTSB","FNPTTO","FXPTEB","FXPTML","FXPTPB","FXPTPR","FXPTRX","FXPTSB","FXPTTO","PTBJEB","PTBJML","PTBJPB","PTBJPR","PTBJRX","PTBJSB","PTBJTO","PTBPEB","PTBPML","PTBPPB","PTBPPR","PTBPRX","PTBPSB","PTBPTO","PTEOEB","PTEOML","PTEOPB","PTEOPR","PTEORX","PTEOSB","PTEOTO","PTEREB","PTERML","PTERPB","PTERPR","PTERRX","PTERSB","PTERTO","PTFHEB","PTFHML","PTFHPB","PTFHPR","PTFHRX","PTFHSB","PTFHTO","PTFIEB","PTFIML","PTFIPB","PTFIPR","PTFIRX","PTFISB","PTFITO","PTFNEB","PTFNML","PTFNPB","PTFNPR","PTFNRX","PTFNSB","PTFNTO","PTFTEB","PTFTML","PTFTPB","PTFTPR","PTFTRX","PTFTSB","PTFTTO","PTFXEB","PTFXML","PTFXPB","PTFXPR","PTFXRX","PTFXSB","PTFXTO","PTPTEB","PTPTML","PTPTPB","PTPTPR","PTPTRX","PTPTSB","PTPTTO"]
    var LIST_AUTRES_FEU = ["BJBJEB","BJBJRX","BJBPEB","BJBPRX","BJBPSB","BJBPTO","BJEOEB","BJEORX","BJEOSB","BJEOTO","BJERRX","BJEOEN","EOBJRX","EOBPEN","EOBPRX","EOBPSB","ERBJSB","FHBPRX","FHFHML","FHFHRX","FHFHTO","FOPESB","FOFOSB","FNFXML","FNFNRX","FNFNML","FNFNSB","FNFXRX","FNFXSB","FHBPEN","FHBPEP","FHEOEN","FHEOEP","FHFHEP","FHFIEN","FHFIEP","FHFNEN","FHFNEP","FHFXEN","FHFXEP","FHPEEN","FHPEEP","FHEN","FHEP","FNBPEP","FNEOEN","FNEOEP","FNFHEN","FNFHEP","FNFIEN","FNFIEP","FNFNEP","FNFXEN","FNFXEP","FNPEEP","FNEP","FXBPEX","FXBPEP","FXEOEX","FXEOEP","FXFHEX","FXFHEP","FXFIEN","FXFIEP","FXFNEN","FXFNEP","FXFXEP","FXPEEX","FXPEEP","FXEP","FNFNPG","FNBPPG","FNEOPG","FNFIPG","FNFXPG","FOPTSB","FHPTEN","FHPTEP","FNPTEP","FXPTEX","FXPTEP"]
    //groupement Provenant de melange feuillu mais en plantation
    var LIST_P_R_FI =["EBBP","EBFN","EBFX","EBPE","MLFN","MLFX","MLRX","PBFX","PRFX","RXRZFX","RZBP","RZFI","RZFN","RZFX","RZPE","EBPT","RZPT"] 
    var LIST_P_FI_RX =["PERZ","PEEB","FXRZ","FXPR","FXML","FXPB","FXFXEB","FXEB","FNRZ","FNML","FNFXRX","FNFNRX","FNEB","FIRZ","BPEB","PTRZ","PTEB"]
    //groupement plantation melange feuillu et resineux
    var LIST_P_E_F =["ENBP","ENFI","ENFN","ENFH","ENFX","ENPE","ENEBBP","ENEBFI","ENEBFN","ENEBFH","ENEBFX","ENEBPE","ENMLBP","ENMLFI","ENMLFN","ENMLFH","ENMLFX","ENMLPE","ENPT","ENEBPT","ENMLPT"]
    var LIST_P_mel_res = ["ENPGBP","ENPGFH","ENPGFI","ENPGFN","ENPGFX","ENPGPE","EBPGBP","EBPGFH","EBPGFI","EBPGFN","EBPGFX","EBPGPE","RXPGBP","RXPGFH","RXPGFI","RXPGFN","RXPGFX","RXPGPE","MLPGBP","MLPGFH","MLPGFI","MLPGFN","MLPGFX","MLPGPE","PGBP","PGFI","PGFN","PGFX","PGPE","ENPGPT","EBPGPT","RXPGPT","MLPGPT","PGPT"]
    var LIST_P_mel_feu_E = ["BPEN","FIEN","FNEN","FNFXEN","FXEN","FXFXEN","FXFXEP","PEEN","BPEP","FIEP","FNEP","FNFXEP","FXEP","PEEP","PTEN","PTEP"]
    var LIST_P_mel_feu_PG = ["BPPG","FIPG","FHPG","FNPG","FXFXPG","FXPG","PEPG","BPBPPG","FIFIPG","BPFIPG","PEBBPG","BBPEPG","PTPG","PTBBPG","BBPTPG"]

    //groupement feuillu
    var LIST_PE = ["PE","PEPE","PT","PTPT"]
    var LIST_BB = ["BP","BPBP"]
    var LIST_FI = ["BPBJ","BPEO","BPFH","BPFI","BPFN","BPFX","BPFX","BPPE","FIBP","FIEO","FIFH","FIFI","FIFN","FIFX","FIPE","FNFX","Fx","FXEO","FXFH","FXFI","FXFI","FXFN","FXFX","FXFX","FXPE","FXPE","EBP","EEO","EFH","EFI","EFN","EFX","EFO","EFX","FZFX","FZ","H","BPPT","FIPT","FXPT","FXPT"]
    var LIST_AUTRES_FEU = ["BJBJ","BJBP","BJEO","BJES","BJER","BJFI","BJFX","BJPE","BJ","EOBJ","EOBP","EoEo","EOES","EOER","EOFI","EOFx","EOPE","EO","ERBJ","ERBP","EREO","ERES","ERER","ERFI","ERFX","ERPE","ER","ESES","ESBP","ESBJ","ESES","ESER","ESFI","ESFX","ESPE","ES","PO","BJPT","EOPT","ERPT","ESPT"]
    var LIST_FNC = ["FNFN","FNFH","FNFI","FNFO","FNFX","FNEO","FHBJ","FHBP","FHEO","FHES","FHER","FHFH","FHFI","FHFN","FHFX","FHPE","Fh","FOFO","FOPE","FOEO","FOES","FOER","FOFH","FOFI","FOFN","FOFX","FOPE","Fo","FNBP","FNPE","FNFI","FHPT","FOPT","FOPT","FNPT"]

    //groupement plantation indeterminer
    var LIST_R_P_IND = ["RZ","RZRX","RXRZ"]
    var LIST_M_P_IND = ["RZRXFX","RZRXFN","RZFXFN","RZFX","RZFNFX","RZFN","RZFI","RXFXRZ","FXRZ"]

    //////////////////////////////////////
    //ASSOCIATION DES GROUPEMENT D'ESSENCES DU SHP AUX LISTE DES GROUPEMENTS CI-DESSUS, VOIR CLE DECISIONNELLE

    //essence resineux
    if (feature.properties.type_couv == "R"){ 
        if (PLANTATION == "non"){
            if (LIST_EE.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "EE"
            }if (LIST_E_RX.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "E(Rx)"
            }if (LIST_PGPG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "PGPG"
            }if (LIST_PG_RX.includes(feature.properties.gr_ess)){ 
                REGROUPEMENT = "PG(Rx)"
            }if (LIST_AUTRES.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "Autres"
            }if (feature.properties.gr_ess == null){
                REGROUPEMENT = "Sans_Res"
            }

        //plantation resineux
        }if (PLANTATION == "oui"){
            if (LIST_P_E.includes(feature.properties.gr_ess)){   
                REGROUPEMENT = "P_E"
            }if (LIST_P_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_PG"
            }if (LIST_R_P_IND.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_E"
            }
        }

    //essence melange
    }if (feature.properties.type_couv == "M"){	
        if (PLANTATION == "non"){	
            //melange resineux
            if (LIST_E_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "E(Fi)"
            }if (LIST_PG_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "PG(Fi)"
            }if (LIST_R_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"  
            //melange feuillu
            }if (LIST_FI_E.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(E)"
            }if (LIST_FI_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(PG)"	
            }if (LIST_FI_RX.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "FI(Rx)"
            }if (LIST_AUTRES_FEU.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "Autres_Feuillus"
            }if (feature.properties.gr_ess == null){
                REGROUPEMENT = "Sans_Mel"
            }   
        //plantation melange	
        }if (PLANTATION == "oui"){
            if (LIST_P_R_FI.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"
            }if (LIST_P_FI_RX.includes(feature.properties.gr_ess)){ 
                REGROUPEMENT = "FI(Rx)"
            }if (LIST_P_E_F.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_E_F"
            }if (LIST_P_mel_res.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_res" 
            }if (LIST_P_mel_feu_E.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_feu_E"	
            }if (LIST_P_mel_feu_PG.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "P_melange_feu_PG"
            }if (LIST_M_P_IND.includes(feature.properties.gr_ess)){
                REGROUPEMENT = "R(Fi)"
            }
        }

    //essence feuillu
    }if (feature.properties.type_couv == "F"){		
        if (LIST_PE.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "PE"
        }if (LIST_BB.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "BB"
        }if (LIST_FI.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "FI" 
        }if (LIST_AUTRES_FEU.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "Autres_feuillus" 
        }if (LIST_FNC.includes(feature.properties.gr_ess)){
            REGROUPEMENT = "FNC" 
        }if (feature.properties.gr_ess == null){
            REGROUPEMENT = "Sans_Feu"  
        }
    }
    
    //////// FEU PEU SEVERE

    ///if (CLASSES == "peu_severe" && (feature.properties.origine == null || feature.properties.origine == 'P')){
    if (feature.properties.origine == null || feature.properties.origine == 'P'){
        ////Association au potentiel resineux
        //Regroupement EE
        if (REGROUPEMENT == "EE"){  
            if (cl_age < 50){
                regen = "mauvais" 
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen"     
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }
                
        //Regroupement E(Rx)	  
        }if (REGROUPEMENT == "E(Rx)"){  
            if (cl_age < 50){
                regen = "mauvais" 
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,2,3,4,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if (SOL == 5){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }

        //Regroupement PGPG
        }if (REGROUPEMENT == "PGPG"){  
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }

        //Regroupement PG(Rx) 
        }if (REGROUPEMENT == "PG(Rx)"){  
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30 && cl_age < 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 50){     
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([3,6,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([1,2,4,5].includes(SOL)){
                        regen = "moyen"  
                    }
                }
            }

        //Regroupement Autres	
        }if (REGROUPEMENT == "Autres"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais"   
            }

        //Regroupement plantation epinettes
        }if (REGROUPEMENT == "P_E"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,3,6,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,4,5].includes(SOL)){
                    regen = "moyen" 
                }
            }

        //Regroupement plantation pin gris	
        }if (REGROUPEMENT == "P_PG"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([3,6,7].includes(SOL)){
                    regen = "mauvais"    
                }if ([1,2,4,5].includes(SOL)){
                    regen = "moyen"   	
                }
            }

        //Regroupement sans regroupement resineux
        }if (REGROUPEMENT == "Sans_Res"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais"      
            }

        ////Association au potentiel melange resineux
        //regroupement E(Fi)
        }if (REGROUPEMENT == "E(Fi)"){
            if (cl_age < 50){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 50){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 				
                    }
                }if (feature.properties.cl_dens == "C"){
                    if ([1,3,4,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 				    			
                    }
                }
            }

        //Regroupement PG(Fi)
        }if (REGROUPEMENT == "PG(Fi)"){
            if (cl_age < 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }if (cl_age >= 30){
                if (SOL == 7){
                    regen = "mauvais" 
                }if ([3,6].includes(SOL)){
                    regen = "moyen" 
                }if ([1,2,4,5].includes(SOL)){
                    regen = "bon" 			
                }
            }

        //Regroupement "R(Fi)"	
        }if (REGROUPEMENT == "R(Fi)"){
            if (cl_age < 30){
                if ([1,3,6,7].includes(SOL)){
                    regen = "mauvais"    
                }if ([2,4,5].includes(SOL)){
                    regen = "moyen"    
                }
            }if (cl_age >= 30){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }

        //Regroupement Plantation E et F 
        }if (REGROUPEMENT == "P_E_F"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }

        //Regroupement plantation melange resineux
        }if (REGROUPEMENT == "P_melange_res"){
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,3,6,7].includes(SOL)){
                    regen = "mauvais"    
                }if ([2,4,5].includes(SOL)){
                    regen = "moyen" 
                }
            }

        ////Association melange sans
        }if (REGROUPEMENT == "Sans_Mel"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais" 
            }

        ////Association au potentiel melange feuillu
        //Regroupement FI(E)
        }if (REGROUPEMENT == "FI(E)"){
            if (cl_age < 50){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4].includes(SOL)){
                        regen = "moyen" 
                    }if ([5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen"  
                    }
                }
            }if (cl_age >= 50 && cl_age <= 70){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,6].includes(SOL)){
                        regen = "moyen" 
                    }if (SOL == 5){
                        regen = "bon" 		 
                    }
                }
            }if (cl_age > 70){ 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,4].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,3,5,6].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([3,4,6]){
                        regen = "moyen" 	
                    }if ([2,5].includes(SOL)){
                        regen = "bon" 	 
                    }
                }
            }

        //Regroupement FI(PG)	 
        }if (REGROUPEMENT == "FI(PG)"){  
            if (cl_age < 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais" 
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "moyen" 
                }
            }if (cl_age >= 30){     
                if (SOL == 7){
                    regen = "mauvais" 
                }if (SOL == 1){
                    regen = "moyen"    
                }if ([2,3,4,5,6].includes(SOL)){
                    regen = "bon" 
                }
            }

        //Regroupement FI(Rx)  
        }if (REGROUPEMENT == "FI(Rx)"){  
            if (cl_age < 30){	 
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,4,7].includes(SOL)){
                        regen = "mauvais"    
                    }if ([2,5,6].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 30){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 	
                    }
                }if (feature.properties.cl_dens == "C" || feature.properties.cl_dens == "D"){
                    if ([1,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,3,4,6].includes(SOL)){
                        regen = "moyen" 	
                    }if (SOL == 5){
                        regen = "bon" 
                    }
                }
            }

        //Regroupement autres feuillus  (melange)
        }if (REGROUPEMENT == "Autres_Feuillus"){
            if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }if (SOL == 7){
                regen = "mauvais" 
            }

        //Regroupement plantation melange feuillu - epinette 
        }if (REGROUPEMENT == "P_melange_feu_E"){ 
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([1,7].includes(SOL)){
                    regen = "mauvais"  
                }if ([2,3,4,5,6].includes(SOL)){	
                    regen = "moyen" 
                }
            }

        //Regroupement plantation melange feuillu - pin gris   
        }if (REGROUPEMENT == "P_melange_feu_PG"){ 
            if (cl_age < 30){
                regen = "mauvais" 
            }if (cl_age >= 30){
                if ([3,6,7].includes(SOL)){
                    regen = "mauvais"  
                }if ([1,2,4,5].includes(SOL)){
                    regen = "moyen"     
                }
            }
            
        ////Association au potentiel feuillu
        //Regroupement PE
        }if (REGROUPEMENT == "PE"){
            if ([1,7].includes(SOL)){
                regen = "mauvais" 
            }if (SOL == 2){
                regen = "moyen" 
            }if ([3,4,5,6].includes(SOL)){
                regen = "bon"  
            }
            
        //Regroupement BB
        }if (REGROUPEMENT == "BB"){
            if (cl_age < 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([1,3].includes(SOL)){
                        regen = "moyen" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    regen = "mauvais" 	
                }
            }if (cl_age >= 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    regen = "mauvais" 
                }
            }
            
        //Regroupement FI
        }if (REGROUPEMENT == "FI"){
            if (cl_age < 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,3,6].includes(SOL)){
                        regen = "moyen" 
                    }if	([2,4,5].includes(SOL)){
                        regen = "bon" 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen" 
                    }
                }
            }if (cl_age >= 90){
                if (feature.properties.cl_dens == "A" || feature.properties.cl_dens == "B" || feature.properties.cl_dens == "C"){
                    if (SOL == 7){
                        regen = "mauvais" 
                    }if ([1,2,3,4,6].includes(SOL)){
                        regen = "moyen" 
                    }if (SOL == 5){
                        regen = "bon" 	 
                    }
                }if (feature.properties.cl_dens == "D"){
                    if ([1,3,6,7].includes(SOL)){ 
                        regen = "mauvais" 
                    }if ([2,4,5].includes(SOL)){
                        regen = "moyen"  
                    }
                }
            }
            
        //Regroupement autre feuillus
        }if (REGROUPEMENT == "Autres_Feuillus"){
            regen = "mauvais" 
            
        //Regroupement FNC
        }if (REGROUPEMENT == "FNC"){
            regen = "mauvais" 

        //Regroupement Sans
        }if (REGROUPEMENT == "Sans_Feu"){
            if (SOL == 7){
                regen = "mauvais" 
            }if ([1,2,3,4,5,6].includes(SOL)){
                regen = "ne sais pas" 
            }
        }
    }   

    

    //////////////////
    //CREATION LISTE INTRUS DANS LE GROUPE D'ESSENCE, VOIR CLE DECISIONNELLE
    var liste_intrus = ["AF","AL","ANT","BR","CBA","CEF","CHT","CPR","CPT","CT","DH","DS","EAU","ENS","ES","FR","GR","ILE","INO","LTE","NF","P","PRR","RPS","RO"] 

    //CREATION LISTE POUR IMPRODUCTif (ET NON FORESTIER
    var LIST_IMPROD = ["AL","DH","DS"]
    var LIST_NON_FOR = ["IMP","ANT","NF","AF","ILE","EAU","INO","A","GR","LTE","RO","NX","AEP","CFO","DEP"]

    //SI INTRUS DANS feature.properties.co_ter OU feature.properties.origine, DIFFERENT DE P et feature.properties.gr_ess NON VIDE ){ REGEN NE SAIS PAS 
    if (((liste_intrus.includes(feature.properties.origine)) || (liste_intrus.includes(feature.properties.co_ter))) && ((feature.properties.gr_ess != null) && (feature.properties.origine != 'P'))){
        regen = "ne sais pas"  

    //SI feature.properties.origine VIDE ET feature.properties.gr_ess VIDE ){ REGEN NE SAIS PAS   
    }if ((feature.properties.origine != null) && (feature.properties.gr_ess == null)){
        regen = "ne sais pas" 

    //POUR TOUTE PLANTATION, SI CLASSE D'AGE INFERIEUR OU EGALE A 30, REGENERATION EST FAIBLE. DECISION PAR OSVALDO
    }if (((feature.properties.origine == 'P') || (feature.properties.origine == 'PRR')) && ((cl_age <= 30) && (feature.properties.gr_ess != null))){
        regen = "mauvais" 

    //Regeneration feature.properties.co_ter
    }if ((feature.properties.co_ter != null) && (feature.properties.gr_ess == null)){
        if (LIST_IMPROD.includes(feature.properties.co_ter)){
            regen = "mauvais" 
        }if (LIST_NON_FOR.includes(feature.properties.co_ter)){
            regen = "NA" 
        }
    }

    if (regen == "bon"){
        bon += 1
        return vert
    }if (regen == "moyen"){
        moyen += 1
        return jaune
    }if (regen == "mauvais"){
        mauvais += 1
        return rouge
    }if (regen == "ne sais pas"){
        nsp += 1
        return gris
    }if (regen == "NA"){
        na += 1
        return blanc
    } else {
        return blanc
    }
}
//fonction qui permet d'uploader la couche de chemin forestion
function upload(){
    //requete sql pour uploader Ã  partir d'un protocole AJAX Ã  l'aide d'un formulaire php
    $.ajax({url:'php/upload.php?id=' + id + '&origine=' + origine + '&type_couv=' + type_couv + '&gr_ess=' + gr_ess + '&cl_age=' + cl_age + '&cl_dens=' + cl_dens + '&dep_sur=' + dep_sur + '&cl_drai=' + cl_drai + '&co_ter=' + co_ter,
        success: function(response){
            peuplement = JSON.parse(response)

            document.getElementById("submit").onclick = function(e){
                var files = document.getElementById('file').files;
                if (files.length == 0) {
                  return; //do nothing if no file given yet
                }   
              
                var fr = new FileReader();
        
                fr.onload = function(e) { 
                    var result = JSON.parse(e.target.result);
                    test = L.geoJson(result)
                    
                    bon = 0
                    moyen = 0
                    mauvais = 0
                    nsp = 0
                    na = 0
                    
                    for (i = 0; i < peuplement.features.length; i++) {
                        type_severe = result.features[0].properties.classe_feu
                        if (type_severe == "severe"){
                            testF = L.geoJson(peuplement.features[i], {
                                style : severe(peuplement.features[i]),
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup(
                                        '<b>'+
                                        'ID: ' + feature.properties.id +'</br>'+
                                        'Origine: ' + feature.properties.origine + '<br>'+
                                        'Type couv: ' + feature.properties.type_couv + '<br>'+
                                        'GR_ESS: ' + feature.properties.gr_ess + '<br>'+
                                        'CL_AGE: ' + feature.properties.cl_age + '<br>'+
                                        'CL_DENs: ' + feature.properties.cl_dens + '<br>'+
                                        'DEP_SUR: ' + feature.properties.dep_sur + '<br>'+
                                        'CL_DRAI: ' + feature.properties.cl_drai + '<br>'+
                                        'CO_TER: ' + feature.properties.co_ter + '<br>'+
                                    '</b>'   
                                    )
                                }
                            })
                        } if (type_severe == "peu_severe"){
                            testF = L.geoJson(peuplement.features[i], {
                                style : peu_severe(peuplement.features[i]),
                                onEachFeature: function (feature, layer) {
                                    layer.bindPopup(
                                        '<b>'+
                                        'ID: ' + feature.properties.id +'</br>'+
                                        'Origine: ' + feature.properties.origine + '<br>'+
                                        'Type couv: ' + feature.properties.type_couv + '<br>'+
                                        'GR_ESS: ' + feature.properties.gr_ess + '<br>'+
                                        'CL_AGE: ' + feature.properties.cl_age + '<br>'+
                                        'CL_DENs: ' + feature.properties.cl_dens + '<br>'+
                                        'DEP_SUR: ' + feature.properties.dep_sur + '<br>'+
                                        'CL_DRAI: ' + feature.properties.cl_drai + '<br>'+
                                        'CO_TER: ' + feature.properties.co_ter + '<br>'+
                                    '</b>'   
                                    )
                                }
                            })
                        }
                        
                        
                        value = test.getBounds().contains(testF.getBounds())
                        if (value == true){
                            //polyLayers.push(peuplement.features[i])
                            testF.addTo(map)
                        }
                    }

                    var ctx = document.getElementById('myChart').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: ['Bon', 'Moyen', 'Mauvais', 'Ne sais pas', 'NA'],
                            datasets: [{
                                label: 'Nb de polygons',
                                data: [bon, moyen, mauvais, nsp, na],
                                backgroundColor: [
                                    'green',
                                    'yellow',
                                    'red',
                                    'grey',
                                    'white'
                                ],
                                borderColor: [
                                    'black'
                                ],
                                borderWidth : 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                legend: {
                                display: false
                                },
                                title: {
                                    display: true,
                                    text: 'Nb de peuplement par catégories',
                                }
                            }
                        }
                    });
                }
                    
                fr.readAsText(files.item(0));
            };
        }
    })	
}
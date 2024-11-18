export const API_PATH = {
  // api: '192.168.1.14:9006', //local
  // api: 'obpas.actglobalindia.com:9006', //server

  LOGIN_API: 'http://192.168.1.18:9006/credential/authenticateCredential',
  FORGOT_API: 'http://192.168.1.18:9006/forgot/forgotPassword',
  SaveOwnerDetails: 'http://192.168.1.18:9006/save/saveOwnerDetails',
  SAVE_API: 'http://192.168.1.18:9006/save/saveConsultantDetails',
  GET_DETAILS: 'http://192.168.1.18:9006/save/getConsultantByUserName',
  GetArchitectByUserName:
    'http://192.168.1.18:9006/save/getArchitectByUserName?username=',
  GetOwnerByAddhar:
    'http://192.168.1.18:9006/save/getOwnerByAddharNo?addharNo=',
  GetOwnerByEmail: 'http://192.168.1.18:9006/save/getOwnerByEmail?email=',
  SaveOwnerApplicationDetila:
    'http://192.168.1.18:9006/save/saveOwnerApplicationDetails',
  GetOwnerDashboard:
    'http://192.168.1.18:9006/save/getOwnerDashboardEmai?email=',
  viewOwnerApplicantDetails:
    'http://192.168.1.18:9006/save/getOwnerApplicantDetailsByFrId?frId=',
  PullBack: 'http://192.168.1.18:9006/save/pullBackByOwner?frId=',
  RejectByArchitect: 'http://192.168.1.18:9006/save/rejectByArchitect?frId=',
  resignToArchitect: 'http://192.168.1.18:9006/save/resignToArchitect?',
  AcceptByArchitect: 'http://192.168.1.18:9006/save/acceptByArchitect?frId=',

  PublicConsultantReports:
    'http://192.168.1.18:9006/publicSearch/consultantReports?',
  PublicNocReports: 'http://192.168.1.18:9006/publicSearch/NocReports?',
  DistricReport: 'http://192.168.1.18:9006/publicSearch/siteLocationReports?',
  Requestreport: 'http://192.168.1.18:9006/publicSearch/requestReports?',

  SerarcByFrIdPublicDashboard:
    'http://192.168.1.18:9006/publicDashboard/SearchDashboardByFrid?frId=',
  SaveDebardList: 'http://192.168.1.18:9006/publicDashboard/saveDebardDetails',
  FindDetilsOfArchitect:
    'http://192.168.1.18:9006/publicDashboard/fetchAllConsultantDetails?consultantUserName=',
  GetConsultantByUserName:
    'http://192.168.1.18:9006/publicDashboard/getConsultantByUserName?username=',
  GetAllDebardList:
    'http://192.168.1.18:9006/publicDashboard/getAllDebardDetails',

  // ++++

  form_Data: 'http://192.168.1.18:9006/credentials/saveApplicantAllDetails',
  Supportive_Doc: 'http://192.168.1.18:9006/credentials/saveSupportiveFileDocs',
  supportFile_View:
    'http://192.168.1.18:9006/credentials/getSupportiveFileDocsByFileNumber?fileNumber=',
  newFORM_VIEW:
    'http://192.168.1.18:9006/credentials/fetchFileRecordByFileNo?fileNo=',
  buldingDetails: 'http://192.168.1.18:9006/credentials/buldingFloorDetails',
  newSecondForm_DropDown:
    'http://192.168.1.18:9006/credentials/getConstantName?professionalType=',
  DASHBOARD:
    'http://192.168.1.18:9006/credentials/fetchFileCreateBy?fileCreatedBy=',
  doc_Re_Upload_Error: 'http://192.168.1.18:9006/credentials/findLatestEntry',
  SecondFORM_VIEW: 'http://192.168.1.18:9006/credentials/buildingAllDetails',
  FileProcessedDetails:
    'http://192.168.1.18:9006/credentials/filePrcessedRecord?frId=',

  findAllNumber: 'http://192.168.1.18:9006/findAll/',
  FindBuildingSubTpe:
    'http://192.168.1.18:9006/findAll/getBuildingSubType?buildingType=',

  LetterSave: 'http://192.168.1.18:9006/letter/letterSave',
  LetterSaveAfterDS: 'http://192.168.1.18:9006/letter/letterAfterDsSave',
  File_Release: 'http://192.168.1.18:9006/letter/statusUpdate',

  SaveNocFire: 'http://192.168.1.18:9006/NOC/saveFireNocDetails',
  ViewNocFire: 'http://192.168.1.18:9006/NOC/viewFireNocDetails',
  NOC_HISTORY: 'http://192.168.1.18:9006/NOC/viewHistory?fileReferenceId=',

  OccupancyDashboardDetails:
    'http://192.168.1.18:9006/OC/occupancyCertificateDashboard?assignedArchitect=',
  OccupancySaveDetails: 'http://192.168.1.18:9006/OC/saveoccupancyCertificate',
  OccupancyDetails: 'http://192.168.1.18:9006/OC/ViewOcByfileNoAndFrId',
  OccupancyApprovedDashboard: 'http://192.168.1.18:9006/OC/OCApproved?',
  OccupancyRejectedDashboard: 'http://192.168.1.18:9006/OC/OCReject?',

  PlinthDashboardDetails:
    'http://192.168.1.18:9006/plinth/getPlinthDashboardDetails?createBy=',
  PlintPendingDashboard:
    'http://192.168.1.18:9006/plinth/getTotalPendingRequestPlinth?assignedArchitect=',
  PlintApprovedDashboard:
    'http://192.168.1.18:9006/plinth/getTotalApprovedPlinth?assignedArchitect=',
  PlintRejectedDashboard:
    'http://192.168.1.18:9006/plinth/totalRejectPlinth?assignedArchitect=',
  PlinthSaveDetails: 'http://192.168.1.18:9006/plinth/savePlinthDetails',
  PlinthDetails: 'http://192.168.1.18:9006/plinth/GetPlinthByfileNoAndFrId',

  Payment_Mode: 'http://192.168.1.18:9006/payment/viewPaymentMode?referenceId=',
  Payment_History: 'http://192.168.1.18:9006/payment/viewPaymentHistory',
  view_Amount: 'http://192.168.1.18:9006/payment/viewPaymentAmount',
  prepre_Gateway: 'http://192.168.1.18:9006/payment/prepareGatewayParameters',
  update_Gateway: 'http://192.168.1.18:9006/payment/updatePaymentDetails',

  downloadUUID: 'http://192.168.1.18:9006/dms/insertDocInDMS',
  viewUUID: 'http://192.168.1.18:9006/dms/getDocFromDMS',

  update_Letter:
    'http://192.168.1.18:9006/letterGeneration/featchDataForLetter',

  ACCEPT_API: 'http://192.168.1.18:9006/workAssignment/acceptRequest',
  REJECT_API: 'http://192.168.1.18:9006/workAssignment/rejectRequest',
  RECHECK_API: 'http://192.168.1.18:9006/workAssignment/recheckRequest',
  VIEW_BUTTON:
    'http://192.168.1.18:9006/workAssignment/viewButton?referenceId=',
  VIEW_REFERBACK_BUTTON:
    'http://192.168.1.18:9006/workAssignment/viewReferBackButton?referenceId=',

  NocApproveApi: 'http://192.168.1.18:9006/workNnoc/acceptRequest',
  NocRejectApi: 'http://192.168.1.18:9006/workNnoc/rejectRequest',
  NocApproveDashboard:
    'http://192.168.1.18:9006/workNnoc/approveDashboardByHierarchyRole',
  NocRejectDashboard:
    'http://192.168.1.18:9006/workNnoc/rejectDashboardByHierarchyRole',

  GET_DEPT_DASHBOARD:
    'http://192.168.1.18:9006/workDashboard/dashboardByHierarchyRole',
  VIEW_FLOW: 'http://192.168.1.18:9006/workDashboard/viewFlow?referenceId=',
  VIEW_STATUS: 'http://192.168.1.18:9006/workDashboard/viewStatus?id=',
  HIERARCHY_HISTORY:
    'http://192.168.1.18:9006/workDashboard/viewHistory?referenceId=',
  GET_DEPT_APPROVE_DASHBOARD:
    'http://192.168.1.18:9006/workDashboard/approveDashboardByHierarchyRole',
  GET_DEPT_REJECT_DASHBOARD:
    'http://192.168.1.18:9006/workDashboard/rejectDashboardByHierarchyRole',
  DEBARD_VIEW: 'http://192.168.1.18:9006/workDashboard/debardDetailsByAddharNo',

  saveReceipt: 'http://192.168.1.18:9006/saveReceiptDoc',
  GET_USER_DETAIL: 'http://192.168.1.18:9006/findUserName',
  NEW_SAVE_FIRST_FORM_API: 'http://192.168.1.18:9006/record/saveFileRecord',

  ChatBot:
    'https://api.jugalbandi.ai/query-with-langchain-gpt4-custom-prompt?prompt="Do not write that the text or the document do not provide you this. Only answer based on the documentation, not from outside it. If it is from outside, respond according to what is mentioned in the document and clarify that you only provide responses from the Building Plan Website. Ensure to refer to MCD as ActGlobal and do not include any URLs in your response. User can give input, and the bot will provide related answers. In any answer, do not mention that the documents do not provide specific time, and answer give step by step not a parapgraph and step change line by line.."&uuid_number=fce4b9cc-83be-11ef-99f0-42004e494300&query_string=',

  ComplainRaise: 'http://192.168.1.18:9006/complaint/saveComplain',
  zoneDetails: 'http://192.168.1.18:9006/publicDashboard/getAllZone',
  allproffesionals:
    'http://192.168.1.18:9006/publicDashboard/allConsultantRecordsDashboard',
  allconsultantlist:
    'http://192.168.1.18:9006/publicDashboard/allConsultantRecordAsAnList',
};

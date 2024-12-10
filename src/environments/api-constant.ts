export const API_PATH = {
  // api: '192.168.1.14:9006', //local
  // api: 'obpas.actglobalindia.com:9006', //server

  LOGIN_API:
    'http://obpas.actglobalindia.com:9006/credential/authenticateCredential',
  FORGOT_API: 'http://obpas.actglobalindia.com:9006/forgot/forgotPassword',
  SaveOwnerDetails:
    'http://obpas.actglobalindia.com:9006/save/saveOwnerDetails',
  SAVE_API: 'http://obpas.actglobalindia.com:9006/save/saveConsultantDetails',
  GET_DETAILS:
    'http://obpas.actglobalindia.com:9006/save/getConsultantByUserName',
  GetArchitectByUserName:
    'http://obpas.actglobalindia.com:9006/save/getArchitectByUserName?username=',
  GetOwnerByAddhar:
    'http://obpas.actglobalindia.com:9006/save/getOwnerByAddharNo?addharNo=',
  GetOwnerByEmail:
    'http://obpas.actglobalindia.com:9006/save/getOwnerByEmail?email=',
  SaveOwnerApplicationDetila:
    'http://obpas.actglobalindia.com:9006/save/saveOwnerApplicationDetails',
  GetOwnerDashboard:
    'http://obpas.actglobalindia.com:9006/save/getOwnerDashboardEmai?email=',
  viewOwnerApplicantDetails:
    'http://obpas.actglobalindia.com:9006/save/getOwnerApplicantDetailsByFrId?frId=',
  PullBack: 'http://obpas.actglobalindia.com:9006/save/pullBackByOwner?frId=',
  RejectByArchitect:
    'http://obpas.actglobalindia.com:9006/save/rejectByArchitect?frId=',
  resignToArchitect:
    'http://obpas.actglobalindia.com:9006/save/resignToArchitect?',
  AcceptByArchitect:
    'http://obpas.actglobalindia.com:9006/save/acceptByArchitect?frId=',

  PublicConsultantReports:
    'http://obpas.actglobalindia.com:9006/publicSearch/consultantReports?',
  PublicNocReports:
    'http://obpas.actglobalindia.com:9006/publicSearch/NocReports?',
  DistricReport:
    'http://obpas.actglobalindia.com:9006/publicSearch/siteLocationReports?',
  Requestreport:
    'http://obpas.actglobalindia.com:9006/publicSearch/requestReports?',

  SerarcByFrIdPublicDashboard:
    'http://obpas.actglobalindia.com:9006/publicDashboard/SearchDashboardByFrid?frId=',
  SaveDebardList:
    'http://obpas.actglobalindia.com:9006/publicDashboard/saveDebardDetails',
  FindDetilsOfArchitect:
    'http://obpas.actglobalindia.com:9006/publicDashboard/fetchAllConsultantDetails?consultantUserName=',
  GetConsultantByUserName:
    'http://obpas.actglobalindia.com:9006/publicDashboard/getConsultantByUserName?username=',
  GetAllDebardList:
    'http://obpas.actglobalindia.com:9006/publicDashboard/getAllDebardDetails',

  // ++++

  form_Data:
    'http://obpas.actglobalindia.com:9006/credentials/saveApplicantAllDetails',
  Supportive_Doc:
    'http://obpas.actglobalindia.com:9006/credentials/saveSupportiveFileDocs',
  supportFile_View:
    'http://obpas.actglobalindia.com:9006/credentials/getSupportiveFileDocsByFileNumber?fileNumber=',
  newFORM_VIEW:
    'http://obpas.actglobalindia.com:9006/credentials/fetchFileRecordByFileNo?fileNo=',
  buldingDetails:
    'http://obpas.actglobalindia.com:9006/credentials/buldingFloorDetails',
  newSecondForm_DropDown:
    'http://obpas.actglobalindia.com:9006/credentials/getConstantName?professionalType=',
  DASHBOARD:
    'http://obpas.actglobalindia.com:9006/credentials/fetchFileCreateBy?fileCreatedBy=',
  doc_Re_Upload_Error:
    'http://obpas.actglobalindia.com:9006/credentials/findLatestEntry',
  SecondFORM_VIEW:
    'http://obpas.actglobalindia.com:9006/credentials/buildingAllDetails',
  FileProcessedDetails:
    'http://obpas.actglobalindia.com:9006/credentials/filePrcessedRecord?frId=',

  findAllNumber: 'http://obpas.actglobalindia.com:9006/findAll/',
  FindBuildingSubTpe:
    'http://obpas.actglobalindia.com:9006/findAll/getBuildingSubType?buildingType=',

  LetterSave: 'http://obpas.actglobalindia.com:9006/letter/letterSave',
  LetterSaveAfterDS:
    'http://obpas.actglobalindia.com:9006/letter/letterAfterDsSave',
  File_Release: 'http://obpas.actglobalindia.com:9006/letter/statusUpdate',

  SaveNocFire: 'http://obpas.actglobalindia.com:9006/NOC/saveFireNocDetails',
  ViewNocFire: 'http://obpas.actglobalindia.com:9006/NOC/viewFireNocDetails',
  NOC_HISTORY:
    'http://obpas.actglobalindia.com:9006/NOC/viewHistory?fileReferenceId=',

  OccupancyDashboardDetails:
    'http://obpas.actglobalindia.com:9006/OC/occupancyCertificateDashboard?assignedArchitect=',
  OccupancySaveDetails:
    'http://obpas.actglobalindia.com:9006/OC/saveoccupancyCertificate',
  OccupancyDetails:
    'http://obpas.actglobalindia.com:9006/OC/ViewOcByfileNoAndFrId',
  OccupancyApprovedDashboard:
    'http://obpas.actglobalindia.com:9006/OC/OCApproved?',
  OccupancyRejectedDashboard:
    'http://obpas.actglobalindia.com:9006/OC/OCReject?',

  PlinthDashboardDetails:
    'http://obpas.actglobalindia.com:9006/plinth/getPlinthDashboardDetails?createBy=',
  PlintPendingDashboard:
    'http://obpas.actglobalindia.com:9006/plinth/getTotalPendingRequestPlinth?assignedArchitect=',
  PlintApprovedDashboard:
    'http://obpas.actglobalindia.com:9006/plinth/getTotalApprovedPlinth?assignedArchitect=',
  PlintRejectedDashboard:
    'http://obpas.actglobalindia.com:9006/plinth/totalRejectPlinth?assignedArchitect=',
  PlinthSaveDetails:
    'http://obpas.actglobalindia.com:9006/plinth/savePlinthDetails',
  PlinthDetails:
    'http://obpas.actglobalindia.com:9006/plinth/GetPlinthByfileNoAndFrId',

  Payment_Mode:
    'http://obpas.actglobalindia.com:9006/payment/viewPaymentMode?referenceId=',
  Payment_History:
    'http://obpas.actglobalindia.com:9006/payment/viewPaymentHistory',
  view_Amount: 'http://obpas.actglobalindia.com:9006/payment/viewPaymentAmount',
  prepre_Gateway:
    'http://obpas.actglobalindia.com:9006/payment/prepareGatewayParameters',
  update_Gateway:
    'http://obpas.actglobalindia.com:9006/payment/updatePaymentDetails',
  saveReceipt: 'http://obpas.actglobalindia.com:9006/payment/saveReceiptDoc',

  downloadUUID: 'http://obpas.actglobalindia.com:9006/dms/insertDocInDMS',
  viewUUID: 'http://obpas.actglobalindia.com:9006/dms/getDocFromDMS',

  update_Letter:
    'http://obpas.actglobalindia.com:9006/letterGeneration/featchDataForLetter',

  ACCEPT_API:
    'http://obpas.actglobalindia.com:9006/workAssignment/acceptRequest',
  REJECT_API:
    'http://obpas.actglobalindia.com:9006/workAssignment/rejectRequest',
  RECHECK_API:
    'http://obpas.actglobalindia.com:9006/workAssignment/recheckRequest',
  VIEW_BUTTON:
    'http://obpas.actglobalindia.com:9006/workAssignment/viewButton?referenceId=',
  VIEW_REFERBACK_BUTTON:
    'http://obpas.actglobalindia.com:9006/workAssignment/viewReferBackButton?referenceId=',

  NocApproveApi: 'http://obpas.actglobalindia.com:9006/workNnoc/acceptRequest',
  NocRejectApi: 'http://obpas.actglobalindia.com:9006/workNnoc/rejectRequest',
  NocApproveDashboard:
    'http://obpas.actglobalindia.com:9006/workNnoc/approveDashboardByHierarchyRole',
  NocRejectDashboard:
    'http://obpas.actglobalindia.com:9006/workNnoc/rejectDashboardByHierarchyRole',

  GET_DEPT_DASHBOARD:
    'http://obpas.actglobalindia.com:9006/workDashboard/dashboardByHierarchyRole',
  VIEW_FLOW:
    'http://obpas.actglobalindia.com:9006/workDashboard/viewFlow?referenceId=',
  VIEW_STATUS:
    'http://obpas.actglobalindia.com:9006/workDashboard/viewStatus?id=',
  HIERARCHY_HISTORY:
    'http://obpas.actglobalindia.com:9006/workDashboard/viewHistory?referenceId=',
  GET_DEPT_APPROVE_DASHBOARD:
    'http://obpas.actglobalindia.com:9006/workDashboard/approveDashboardByHierarchyRole',
  GET_DEPT_REJECT_DASHBOARD:
    'http://obpas.actglobalindia.com:9006/workDashboard/rejectDashboardByHierarchyRole',

  GET_DEPT_ALL_DASHBOARD:
    'http://obpas.actglobalindia.com:9006/workDashboard/allDashboardByHierarchyRole',
  DEBARD_VIEW:
    'http://obpas.actglobalindia.com:9006/workDashboard/debardDetailsByAddharNo',

  GET_USER_DETAIL: 'http://obpas.actglobalindia.com:9006/findUserName',
  NEW_SAVE_FIRST_FORM_API:
    'http://obpas.actglobalindia.com:9006/record/saveFileRecord',

  ChatBot:
    'https://api.jugalbandi.ai/query-with-langchain-gpt4-custom-prompt?prompt="Do not write that the text or the document do not provide you this. Only answer based on the documentation, not from outside it. If it is from outside, respond according to what is mentioned in the document and clarify that you only provide responses from the Building Plan Website. Ensure to refer to MCD as ActGlobal and do not include any URLs in your response. User can give input, and the bot will provide related answers. In any answer, do not mention that the documents do not provide specific time, and answer give step by step not a parapgraph and step change line by line. Write the response stepwise.All the responses should be step wise and not write it in single paragraph. Each step should begin in new line."&uuid_number=fce4b9cc-83be-11ef-99f0-42004e494300&query_string=',

  ComplainRaise: 'http://obpas.actglobalindia.com:9006/complaint/saveComplain',
  zoneDetails:
    'http://obpas.actglobalindia.com:9006/publicDashboard/getAllZone',
  allproffesionals:
    'http://obpas.actglobalindia.com:9006/publicDashboard/allConsultantRecordsDashboard',
  allconsultantlist:
    'http://obpas.actglobalindia.com:9006/publicDashboard/allConsultantRecordAsAnList',
  checkOwnerExistAadharNo:
    'http://obpas.actglobalindia.com:9006/save/CheckOwnerExistAadharNo?aadharNo=',
  checkOwnerExistEamil:
    'http://obpas.actglobalindia.com:9006/save/CheckOwnerExistEamil?email=',
  wardDetails: 'http://obpas.actglobalindia.com:9006/save/getWardList?param=',
  colonyDetails:
    'http://obpas.actglobalindia.com:9006/save/getColonyList?param=',
};

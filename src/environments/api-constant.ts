// const api = '192.168.1.18:9006'; // Local API path
const api = `obpas.actglobalindia.com:9006`; //server

export const API_PATH = {
  api,

  LOGIN_API: `http://${api}/credential/authenticateCredential`,

  FORGOT_API: `http://${api}/forgot/forgotPassword`,
  SaveOwnerDetails: `http://${api}/save/saveOwnerDetails`,
  SAVE_API: `http://${api}/save/saveConsultantDetails`,
  GET_DETAILS: `http://${api}/save/getConsultantByUserName`,
  GetArchitectByUserName: `http://${api}/save/getArchitectByUserName?username=`,
  GetOwnerByAddhar: `http://${api}/save/getOwnerByAddharNo?addharNo=`,
  GetOwnerByEmail: `http://${api}/save/getOwnerByEmail?email=`,
  SaveOwnerApplicationDetila: `http://${api}/save/saveOwnerApplicationDetails`,
  GetOwnerDashboard: `http://${api}/save/getOwnerDashboardEmai?email=`,
  viewOwnerApplicantDetails: `http://${api}/save/getOwnerApplicantDetailsByFrId?frId=`,
  PullBack: `http://${api}/save/pullBackByOwner?frId=`,
  RejectByArchitect: `http://${api}/save/rejectByArchitect?frId=`,
  resignToArchitect: `http://${api}/save/resignToArchitect?`,
  AcceptByArchitect: `http://${api}/save/acceptByArchitect?frId=`,

  PublicConsultantReports: `http://${api}/publicSearch/consultantReports?`,
  PublicNocReports: `http://${api}/publicSearch/NocReports?`,
  DistricReport: `http://${api}/publicSearch/siteLocationReports?`,
  Requestreport: `http://${api}/publicSearch/requestReports?`,

  SerarcByFrIdPublicDashboard: `http://${api}/publicDashboard/SearchDashboardByFrid?frId=`,
  SaveDebardList: `http://${api}/publicDashboard/saveDebardDetails`,
  FindDetilsOfArchitect: `http://${api}/publicDashboard/fetchAllConsultantDetails?consultantUserName=`,
  GetConsultantByUserName: `http://${api}/publicDashboard/getConsultantByUserName?username=`,
  GetAllDebardList: `http://${api}/publicDashboard/getAllDebardDetails`,

  // ++++

  form_Data: `http://${api}/credentials/saveApplicantAllDetails`,
  Supportive_Doc: `http://${api}/credentials/saveSupportiveFileDocs`,
  supportFile_View: `http://${api}/credentials/getSupportiveFileDocsByFileNumber?fileNumber=`,
  newFORM_VIEW: `http://${api}/credentials/fetchFileRecordByFileNo?fileNo=`,
  buldingDetails: `http://${api}/credentials/buldingFloorDetails`,
  newSecondForm_DropDown: `http://${api}/credentials/getConstantName?professionalType=`,
  DASHBOARD: `http://${api}/credentials/fetchFileCreateBy?fileCreatedBy=`,
  doc_Re_Upload_Error: `http://${api}/credentials/findLatestEntry`,
  SecondFORM_VIEW: `http://${api}/credentials/buildingAllDetails`,
  FileProcessedDetails: `http://${api}/credentials/filePrcessedRecord?frId=`,

  findAllNumber: `http://${api}/findAll/`,
  FindBuildingSubTpe: `http://${api}/findAll/getBuildingSubType?buildingType=`,

  LetterSave: `http://${api}/letter/letterSave`,
  LetterSaveAfterDS: `http://${api}/letter/letterAfterDsSave`,
  File_Release: `http://${api}/letter/statusUpdate`,

  SaveNocFire: `http://${api}/NOC/saveFireNocDetails`,
  ViewNocFire: `http://${api}/NOC/viewFireNocDetails`,
  NOC_HISTORY: `http://${api}/NOC/viewHistory?fileReferenceId=`,

  OccupancyDashboardDetails: `http://${api}/OC/occupancyCertificateDashboard?assignedArchitect=`,
  OccupancySaveDetails: `http://${api}/OC/saveoccupancyCertificate`,
  OccupancyDetails: `http://${api}/OC/ViewOcByfileNoAndFrId`,
  OccupancyApprovedDashboard: `http://${api}/OC/OCApproved?`,
  OccupancyRejectedDashboard: `http://${api}/OC/OCReject?`,

  PlinthDashboardDetails: `http://${api}/plinth/getPlinthDashboardDetails?createBy=`,
  PlintPendingDashboard: `http://${api}/plinth/getTotalPendingRequestPlinth?assignedArchitect=`,
  PlintApprovedDashboard: `http://${api}/plinth/getTotalApprovedPlinth?assignedArchitect=`,
  PlintRejectedDashboard: `http://${api}/plinth/totalRejectPlinth?assignedArchitect=`,
  PlinthSaveDetails: `http://${api}/plinth/savePlinthDetails`,
  PlinthDetails: `http://${api}/plinth/GetPlinthByfileNoAndFrId`,

  Payment_Mode: `http://${api}/payment/viewPaymentMode?referenceId=`,
  Payment_History: `http://${api}/payment/viewPaymentHistory`,
  view_Amount: `http://${api}/payment/viewPaymentAmount`,
  prepre_Gateway: `http://${api}/payment/prepareGatewayParameters`,
  update_Gateway: `http://${api}/payment/updatePaymentDetails`,
  saveReceipt: `http://${api}/payment/saveReceiptDoc`,

  downloadUUID: `http://${api}/dms/insertDocInDMS`,
  viewUUID: `http://${api}/dms/getDocFromDMS`,

  update_Letter: `http://${api}/letterGeneration/featchDataForLetter`,

  ACCEPT_API: `http://${api}/workAssignment/acceptRequest`,
  REJECT_API: `http://${api}/workAssignment/rejectRequest`,
  RECHECK_API: `http://${api}/workAssignment/recheckRequest`,
  REWORK_API: `http://${api}/workAssignment/referBackToArchRequest`,
  REWORK_API_ARCHITECT: `http://${api}/workAssignment/reworkByArchect`,
  VIEW_BUTTON: `http://${api}/workAssignment/viewButton?referenceId=`,
  VIEW_REFERBACK_BUTTON: `http://${api}/workAssignment/viewReferBackButton?referenceId=`,

  NocApproveApi: `http://${api}/workNnoc/acceptRequest`,
  NocRejectApi: `http://${api}/workNnoc/rejectRequest`,
  NocApproveDashboard: `http://${api}/workNnoc/approveDashboardByHierarchyRole`,
  NocRejectDashboard: `http://${api}/workNnoc/rejectDashboardByHierarchyRole`,

  GET_DEPT_DASHBOARD: `http://${api}/workDashboard/dashboardByHierarchyRole`,
  VIEW_FLOW: `http://${api}/workDashboard/viewFlow?referenceId=`,
  VIEW_STATUS: `http://${api}/workDashboard/viewStatus?id=`,
  HIERARCHY_HISTORY: `http://${api}/workDashboard/viewHistory?referenceId=`,
  GET_DEPT_APPROVE_DASHBOARD: `http://${api}/workDashboard/approveDashboardByHierarchyRole`,
  GET_DEPT_REJECT_DASHBOARD: `http://${api}/workDashboard/rejectDashboardByHierarchyRole`,

  GET_DEPT_ALL_DASHBOARD: `http://${api}/workDashboard/allDashboardByHierarchyRole`,
  DEBARD_VIEW: `http://${api}/workDashboard/debardDetailsByAddharNo`,

  GET_USER_DETAIL: `http://${api}/findUserName`,
  NEW_SAVE_FIRST_FORM_API: `http://${api}/record/saveFileRecord`,

  ChatBot: `https://api.jugalbandi.ai/query-with-langchain-gpt4-custom-prompt?prompt="Do not write that the text or the document do not provide you this. Only answer based on the documentation, not from outside it. If it is from outside, respond according to what is mentioned in the document and clarify that you only provide responses from the Building Plan Website. Ensure to refer to MCD as ActGlobal and do not include any URLs in your response. User can give input, and the bot will provide related answers. In any answer, do not mention that the documents do not provide specific time, and answer give step by step not a parapgraph and step change line by line.."&uuid_number=fce4b9cc-83be-11ef-99f0-42004e494300&query_string=`,

  ComplainRaise: `http://${api}/complaint/saveComplain`,
  zoneDetails: `http://${api}/publicDashboard/getAllZone`,
  allproffesionals: `http://${api}/publicDashboard/allConsultantRecordsDashboard`,
  allconsultantlist: `http://${api}/publicDashboard/allConsultantRecordAsAnList`,
  checkOwnerExistAadharNo: `http://${api}/save/CheckOwnerExistAadharNo?aadharNo=`,
  checkOwnerExistEamil: `http://${api}/save/CheckOwnerExistEamil?email=`,
  wardDetails: `http://${api}/save/getWardList?param=`,
  colonyDetails: `http://${api}/save/getColonyList?param=`,
  updateObservation: `http://${api}/workDashboard/uploadInspection`,
  doc_Re_Upload_Error_DWG: `http://${api}/OC/findLatestEntryForDwg`,
};

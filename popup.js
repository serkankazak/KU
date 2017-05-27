var p = '<div align="right"><div align="left" style="width:100px; background-color:#DDDDDD;"><div id="prog" style="background-color:#4CAF50; height:10px; width: 0%"></div></div></div>';
$("body").append(p);
var eid = "0";
var term = 0;
function l() {
	chrome.storage.local.get(["id", "pass"], function(d) {
		$("input[name=ID]").val(d["id"]);
		$("input[name=PWD]").val(d["pass"]);
		if ($("button").html() == "Go") {			
			$.ajax({
				url: "https://kusis.ku.edu.tr/psp/ps/?cmd=login&languageCd=ENG",
				data: { userid: d["id"], pwd: d["pass"] },
				method: "POST",
				success: function(resp) {
					if (resp.toString().includes("My academic level")) {
						document.body.innerHTML = "";
						$("body").append(p);
						$("#prog").css("width", 10 + "%");
						$("body").append("<link rel='stylesheet' type='text/css' href='https://kusis.ku.edu.tr/cs/ps/cache/css/SSS_STYLESHEET_27.css'>");
						$.ajax({
							url: "https://kusis.ku.edu.tr/psp/ps/EMPLOYEE/HRMS/?PORTALPARAM_COMPWIDTH=Narrow&ptlayout=N&tab=DEFAULT&pageletname=ADMN_KU_SS_ACAD_LEVEL_PAGELET_&cmd=refreshPglt",
							method: "GET",
							success: function(resp) {
								$("#prog").css("width", 20 + "%");
								eid = $(resp).find(".PSLEVEL1GRIDODDROW").find("td").first().text();
								$.ajax({
									url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL?PORTALPARAM_PTCNAV=HC_SS_LAM_STD_GR_LST_GBL1&EOPP.SCNode=HRMS&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SS_LAM_STD_GR_LST_GBL1&IsFolder=false&PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&PortalContentProvider=HRMS&PortalCRefLabel=View%20My%20Assignments&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes",
									method: "GET",
									success: function(resp) {
										$("#prog").css("width", 30 + "%");
										term = (resp.match(/TERM_CAR\$/g) || []).length / 2 - 1;											
										icsid = resp.match(/name='ICSID' id='ICSID' value='[^']*'/)[0].replace("name='ICSID' id='ICSID' value='", "").replace(/'$/, "");
										var obj = {};																								
										obj["ICAJAX"] = "1";
										obj["ICNAVTYPEDROPDOWN"] = "1";
										obj["ICType"] = "Panel";
										obj["ICElementNum"] = "0";
										obj["ICStateNum"] = "1";
										obj["ICAction"] = "DERIVED_SSS_SCT_SSR_PB_GO";
										obj["ICModelCancel"] = "0";
										obj["ICXPos"] = "0";
										obj["ICYPos"] = "238";
										obj["ResponsetoDiffFrame"] = "-1";
										obj["TargetFrameName"] = "None";
										obj["FacetPath"] = "None";
										obj["ICFocus"] = "";
										obj["ICSaveWarningFilter"] = "0";
										obj["ICChanged"] = "-1";
										obj["ICAutoSave"] = "0";
										obj["ICResubmit"] = "0";
										obj["ICSID"] = icsid;
										obj["ICActionPrompt"] = "false";
										obj["ICTypeAheadID"] = "";
										obj["ICBcDomData"] = "C~HC_SS_LAM_STD_GR_LST_GBL1~EMPLOYEE~HRMS~SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL~UnknownValue~View%20My%20Assignments~UnknownValue~UnknownValue~https%3A%2F%2Fkusis.ku.edu.tr%2Fpsp%2Fps%2FEMPLOYEE%2FHRMS%2Fc%2FSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL~UnknownValue*F~HCCC_ENROLLMENT~EMPLOYEE~HRMS~UnknownValue~UnknownValue~Enrollment~UnknownValue~UnknownValue~https%3A%2F%2Fkusis.ku.edu.tr%2Fpsp%2Fps%2FEMPLOYEE%2FHRMS%2Fs%2FWEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_INFRAME%3Fpt_fname%3DHCCC_ENROLLMENT%26c%3D%26FolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT%26IsFolder%3Dtrue~UnknownValue*F~CO_EMPLOYEE_SELF_SERVICE~EMPLOYEE~HRMS~UnknownValue~UnknownValue~Self%20Service~UnknownValue~UnknownValue~https%3A%2F%2Fkusis.ku.edu.tr%2Fpsp%2Fps%2FEMPLOYEE%2FHRMS%2Fs%2FWEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_INFRAME%3Fpt_fname%3DCO_EMPLOYEE_SELF_SERVICE%26c%3D%26FolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE%26IsFolder%3Dtrue~UnknownValue";
										obj["ICPanelName"] = "";
										obj["ICFind"] = "";
										obj["ICAddCount"] = "";
										obj["ICAPPCLSDATA"] = "";
										obj["#ICDataLang"] = "ENG";
										obj["DERIVED_SSTSNAV_SSTS_MAIN_GOTO$7$"] = "9999";
										obj["SSR_DUMMY_RECV1$sels$".concat(term.toString()).concat("$$0")] = term.toString();
										obj["DERIVED_SSTSNAV_SSTS_MAIN_GOTO$8$"] = "9999";
										obj["ptus_defaultlocalnode"] = "PSFT_HR";
										obj["ptus_dbname"] = "KUPROD";
										obj["ptus_portal"] = "EMPLOYEE";
										obj["ptus_node"] = "HRMS";
										obj["ptus_workcenterid"] = "";
										obj["ptus_componenturl"] = "https%3A%2F%2Fkusis.ku.edu.tr%2Fpsp%2Fps%2FEMPLOYEE%2FHRMS%2Fc%2FSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL";
										var uu = "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL";
										var me = "POST";
										if (term < 0) {
											uu = "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL?PORTALPARAM_PTCNAV=HC_SS_LAM_STD_GR_LST_GBL1&amp;EOPP.SCNode=HRMS&amp;EOPP.SCPortal=EMPLOYEE&amp;EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&amp;EOPP.SCLabel=Self%20Service&amp;EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&amp;FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SS_LAM_STD_GR_LST_GBL1&amp;IsFolder=false&amp;PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&amp;PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&amp;PortalContentProvider=HRMS&amp;PortalCRefLabel=View%20My%20Assignments&amp;PortalRegistryName=EMPLOYEE&amp;PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&amp;PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&amp;PortalHostNode=HRMS&amp;NoCrumbs=yes&amp;PortalKeyStruct=yes";
											obj = {};
											me = "GET";
										}
										$.ajax({
											url: uu,
											method: me,
											data: obj,
											dataType: "text",
											success: function(resp) {
												$("#prog").css("width", 40 + "%");
												var c = $(resp).find(".PSLEVEL1GRIDWBO tbody [valign='center']").size();
												var cc = 1;
												$(resp).find(".PSLEVEL1GRIDWBO tbody [valign='center']").each(function(i) {
													$.ajax({
														url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.LAM_STDNT_GRADES.GBL?Page=LAM_STDNT_GRADES&Action=U&CLASS_NBR=" + $(this).find("td:nth-child(3) span").text() + "&EMPLID=" + eid + "&STRM=2162&TargetFrameName=None",
														method: "GET",
														success: function(resp) {
															$("#prog").css("width", (40 + cc++ * 60 / c) + "%");
															if (c == (cc - 1)) { $("#prog").hide(); }
															$("body").append("<br>" + $(resp).find('[id=win0divDERIVED_SSR_FC_SSR_CLASSNAME_LONG]').html() + " - ");
															$("body").append($(resp).find("#ACE_STDNT_GRADE_HDR_MID_TERM_AVG_CURR").find("tr:nth-child(4)").text());
															$("body").append($(resp).find("#ACE_STDNT_GRADE_HDR_MID_TERM_AVG_CURR").find("tr:nth-child(5)").text() + "<br>");
															$("body").append($(resp).find('[id="win0divSTDNT_GRADE_DTL$0"]').html());
														}
													});
												});
											}
										});														
									}
								});						
							}
						});
					}
				}
			});						
		}
	});
}
window.onload = function() {
	l();
	$("button").click(function() {
		chrome.storage.local.set({"id": $("input[name=ID]").val(), "pass": $("input[name=PWD]").val()}, function() {
			l();
		});
	});
};

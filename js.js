function l() {
	var d1 = $.Deferred();
	var d2 = $.Deferred();
	var d3 = $.Deferred();
	var d4 = $.Deferred();
	var ipr = 0;
	chrome.storage.local.get(["id", "pass"], function(d) {
		if ((d["id"] ? (d["id"].length > 0) : false) && (d["pass"] ? (d["pass"].length > 0) : false)) {
			$.ajax({
				url: "https://kusis.ku.edu.tr/psp/ps/?cmd=login&languageCd=ENG",
				data: { userid: d["id"], pwd: d["pass"] },
				method: "POST",
				success: function(resp) {
					if (!resp.toString().includes("My academic level")) {
						$("body").append("<br><br>Wrong id or password");
					} else {
						document.body.innerHTML = "";
						$("body").append('<div align="right"><div id="pcon" align="left" style="width:100px; background-color:#DDDDDD"><div id="prog" style="background-color:#4CAF50; height:10px; width: 0%"></div></div></div>');
						ipr += 10; $("#prog").animate({"width": ipr + "%"});
						$("body").append("<link rel='stylesheet' type='text/css' href='https://kusis.ku.edu.tr/cs/ps/cache/css/SSS_STYLESHEET_27.css'>");
						$.ajax({
							url: "https://kusis.ku.edu.tr/psp/ps/EMPLOYEE/HRMS/?PORTALPARAM_COMPWIDTH=Narrow&ptlayout=N&tab=DEFAULT&pageletname=ADMN_KU_SS_ACAD_LEVEL_PAGELET_&cmd=refreshPglt",
							method: "GET",
							success: function(resp) {
								ipr += 10; $("#prog").animate({"width": ipr + "%"});
								d1.resolve($(resp).find(".PSLEVEL1GRIDODDROW").find("td").first().text());
							}
						});
						$.ajax({
							url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL?PORTALPARAM_PTCNAV=HC_SS_LAM_STD_GR_LST_GBL1&EOPP.SCNode=HRMS&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SS_LAM_STD_GR_LST_GBL1&IsFolder=false&PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&PortalContentProvider=HRMS&PortalCRefLabel=View%20My%20Assignments&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes",
							method: "GET",
							success: function(resp) {
								ipr += 10; $("#prog").animate({"width": ipr + "%"});
								var icsid = resp.match(/name='ICSID' id='ICSID' value='[^']*'/)[0].replace("name='ICSID' id='ICSID' value='", "").replace(/'$/, "");
								var term = (resp.match(/TERM_CAR\$/g) || []).length / 2 - 1;
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
										ipr += 10; $("#prog").animate({"width": ipr + "%"});
										d2.resolve(resp);
										$.ajax({
											url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL",
											data: { ICAction: "CLASSTITLE$0", ICSID: icsid },
											method: "POST",
											success: function(resp) {
												ipr += 10; $("#prog").animate({"width": ipr + "%"});
												d3.resolve(resp.match(/STRM=[0-9]*/)[0].split("=")[1]);
											}
										});
									}
								});
							}
						});
						$.when(d1, d2, d3).done(function(eid, resp2, termid) {
							$.ajax({
								url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL?PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL&PortalContentProvider=HRMS&PortalCRefLabel=View%20My%20Exam%20Schedule&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes",
								method: "GET",
								success: function(resp) {
									ipr += 10; $("#prog").animate({"width": ipr + "%"});
									d4.resolve(resp);
								}
							});
							var c = $(resp2).find(".PSLEVEL1GRIDWBO tbody [valign='center']").size();
							var cc = 1;
							$(resp2).find(".PSLEVEL1GRIDWBO tbody [valign='center']").each(function() {
								$.ajax({
									url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.LAM_STDNT_GRADES.GBL?Page=LAM_STDNT_GRADES&Action=U&CLASS_NBR=" + $(this).find("td:nth-child(3) span").text() + "&EMPLID=" + eid + "&STRM=" + termid + "&TargetFrameName=None",
									method: "GET",
									success: function(resp) {
										cc++;
										ipr += 40 / c; $("#prog").animate({"width": ipr + "%"});
										$("body").append("<br>" + $(resp).find('[id=win0divDERIVED_SSR_FC_SSR_CLASSNAME_LONG]').html() + " - ");
										$("body").append($(resp).find("#ACE_STDNT_GRADE_HDR_MID_TERM_AVG_CURR").find("tr:nth-child(4)").text());
										$("body").append($(resp).find("#ACE_STDNT_GRADE_HDR_MID_TERM_AVG_CURR").find("tr:nth-child(5)").text() + "<br>");
										$("body").append($(resp).find('[id="win0divSTDNT_GRADE_DTL$0"]').html());
										if (c == (cc - 1)) {
											$.when(d4).done(function(exam) {
												var shoe = false;
												var tbl = $.parseHTML("<table></table>");
												$(tbl).append($(exam).find('[id="SS_EXAMSCH1_VW$scroll$0"]').find("tr:nth-child(1)"));
												$(exam).find('[id="SS_EXAMSCH1_VW$scroll$0"]').find("tr").each(function(i) {
													if (i > 0) {
														var dps = $(this).find("td:nth-child(4)").text().split("/");
														if ((new Date(dps[2], dps[1] - 1, dps[0])) - Date.now() > -1000 * 24 * 60 * 60) {
															shoe = true;
															$(tbl).append($(this));
														}
													}
												});
												if (shoe) {
													$("body").append("<br>");
													$("body").append(tbl);
												}
												$("#prog").animate({"width": "100%"}, {complete: function() { $("#pcon").animate({"width": 0 + "%"} )}});
											});
										}
									}
								});
							});
						});
					}
				}
			});
		}
	});
}

$(document).ready(function() {
	if ($("button").length) {
		chrome.storage.local.get(["id", "pass"], function(d) {
			$("input[name=ID]").val(d["id"]);
			$("input[name=PWD]").val(d["pass"]);
		});
		if ($("button").html() == "Go") { l(); }
		$("button").click(function() {
			chrome.storage.local.set({"id": $("input[name=ID]").val(), "pass": $("input[name=PWD]").val()}, function() {
				if ($("button").html() == "Go") { l(); }
			});
		});
	}
});
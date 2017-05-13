var p = '<div align="right"><div align="left" style="width:100px; background-color:#DDDDDD;"><div id="prog" style="background-color:#4CAF50; height:10px; width: 0%"></div></div></div>';
$("body").append(p);
var eid = "0";
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
									url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL?PORTALPARAM_PTCNAV=HC_SS_LAM_STD_GR_LST_GBL1&amp;EOPP.SCNode=HRMS&amp;EOPP.SCPortal=EMPLOYEE&amp;EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&amp;EOPP.SCLabel=Self%20Service&amp;EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&amp;FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SS_LAM_STD_GR_LST_GBL1&amp;IsFolder=false&amp;PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&amp;PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SS_LAM_STD_GR_LST.GBL&amp;PortalContentProvider=HRMS&amp;PortalCRefLabel=View%20My%20Assignments&amp;PortalRegistryName=EMPLOYEE&amp;PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&amp;PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&amp;PortalHostNode=HRMS&amp;NoCrumbs=yes&amp;PortalKeyStruct=yes",
									method: "GET",
									success: function(resp) {
										$("#prog").css("width", 30 + "%");
										var c = $(resp).find(".PSLEVEL1GRIDWBO tbody [valign='center']").size();
										var cc = 1;
										$(resp).find(".PSLEVEL1GRIDWBO tbody [valign='center']").each(function(i) {
											$.ajax({
												url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.LAM_STDNT_GRADES.GBL?Page=LAM_STDNT_GRADES&Action=U&CLASS_NBR=" + $(this).find("td:nth-child(3) span").text() + "&EMPLID=" + eid + "&STRM=2162&TargetFrameName=None",
												method: "GET",
												success: function(resp) {
													$("#prog").css("width", (30 + cc++ * 70 / c) + "%");
													if (c == (cc - 1)) { $("#prog").hide(); }
													$("body").append("<br>" + $(resp).find('[id=win0divDERIVED_SSR_FC_SSR_CLASSNAME_LONG]').html() + "<br>");
													$("body").append($(resp).find('[id="win0divSTDNT_GRADE_DTL$0"]').html());
												}
											});
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

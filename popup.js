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
					}
					$.ajax({
						url: "https://kusis.ku.edu.tr/psp/ps/EMPLOYEE/HRMS/?PORTALPARAM_COMPWIDTH=Narrow&ptlayout=N&tab=DEFAULT&pageletname=ADMN_KU_SS_ACAD_LEVEL_PAGELET_&cmd=refreshPglt",
						method: "GET",
						success: function(resp) {
							$("#prog").css("width", 20 + "%");
							eid = $(resp).find(".PSLEVEL1GRIDODDROW").find("td").first().text();
							$.ajax({
								url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=HC_SSS_STUDENT_CENTER&EOPP.SCNode=HRMS&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER&IsFolder=false&PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL&PortalContentProvider=HRMS&PortalCRefLabel=Student%20Center&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes",
								method: "GET",
								success: function(resp) {
									$("#prog").css("width", 30 + "%");
									var c = $(resp).find("[title='Assignment Grades']").size();
									var cc = 1;
									$(resp).find("[title='Assignment Grades']").each(function(i) {
										$.ajax({
											url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.LAM_STDNT_GRADES.GBL?Page=LAM_STDNT_GRADES&Action=U&CLASS_NBR=" + $(this).parent().parent().parent().parent().find("[title='View Details']").text().replace(/^.*\n.*\(/, '').replace(/\).*$/, '') + "&EMPLID=" + eid + "&STRM=2162&TargetFrameName=None",
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

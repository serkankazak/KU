var eid = "0";
function l() {
	chrome.storage.local.get(["id", "pass"], function(d) {
		$("input[name=ID]").val(d["id"]);
		$("input[name=PWD]").val(d["pass"]);
		if ($("button").html() == "Go") {
			$.ajax({
				url: "https://kusis.ku.edu.tr/psp/ps/?cmd=login&languageCd=ENG",
				data: {
					userid: d["id"],
					pwd: d["pass"]
				},
				method: "POST",
				success: function(resp) {
					if (resp.toString().includes("My academic level")) { document.body.innerHTML = ""; }
					$.ajax({
						url: "https://kusis.ku.edu.tr/psp/ps/EMPLOYEE/HRMS/?PORTALPARAM_COMPWIDTH=Narrow&ptlayout=N&tab=DEFAULT&pageletname=ADMN_KU_SS_ACAD_LEVEL_PAGELET_&cmd=refreshPglt",
						method: "GET",
						async: false,
						success: function(resp) {
							eid = $(resp).find(".PSLEVEL1GRIDODDROW").find("td").first().text();
						}
					});		
					$.ajax({
						url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?PORTALPARAM_PTCNAV=HC_SSS_STUDENT_CENTER&EOPP.SCNode=HRMS&EOPP.SCPortal=EMPLOYEE&EOPP.SCName=CO_EMPLOYEE_SELF_SERVICE&EOPP.SCLabel=Self%20Service&EOPP.SCPTfname=CO_EMPLOYEE_SELF_SERVICE&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_SSS_STUDENT_CENTER&IsFolder=false&PortalActualURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL&PortalContentURL=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2fEMPLOYEE%2fHRMS%2fc%2fSA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL&PortalContentProvider=HRMS&PortalCRefLabel=Student%20Center&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsp%2fps%2f&PortalURI=https%3a%2f%2fkusis.ku.edu.tr%2fpsc%2fps%2f&PortalHostNode=HRMS&NoCrumbs=yes&PortalKeyStruct=yes",
						method: "GET",
						success: function(resp) {
							$(resp).find("[title='Assignment Grades']").each(function(i) {
								document.write("<link rel='stylesheet' type='text/css' href='https://kusis.ku.edu.tr/cs/ps/cache/css/SSS_STYLESHEET_27.css'>")
								$(this).parent().parent().parent().parent().find("[title='View Details']").each(function(i) {
								$.ajax({
									url: "https://kusis.ku.edu.tr/psc/ps/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.LAM_STDNT_GRADES.GBL?Page=LAM_STDNT_GRADES&Action=U&CLASS_NBR=" + $(this).text().replace(/^.*\n.*\(/, '').replace(/\).*$/, '') + "&EMPLID=" + eid + "&STRM=2162&TargetFrameName=None",
									method: "GET",
									async: false,
									success: function(resp) {
										document.write("<br>" + $(resp).find('[id=win0divDERIVED_SSR_FC_SSR_CLASSNAME_LONG]').html() + "<br>");
										document.write($(resp).find('[id="win0divSTDNT_GRADE_DTL$0"]').html());
									}});
								});
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

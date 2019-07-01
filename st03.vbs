Dim j, i, count, day, begin_time, end_time, time_moment
If Not IsObject(application) Then
   Set SapGuiAuto  = GetObject("SAPGUI")
   Set application = SapGuiAuto.GetScriptingEngine
End If
If Not IsObject(connection) Then
   Set connection = application.Children(0)
End If
If Not IsObject(session) Then
   Set session    = connection.Children(0)
End If
If IsObject(WScript) Then
   WScript.ConnectObject session,     "on"
   WScript.ConnectObject application, "on"
End If

session.findById("wnd[0]").maximize
session.findById("wnd[0]/tbar[0]/okcd").text = "st03"
session.findById("wnd[0]/tbar[0]/btn[0]").press
session.findById("wnd[0]/shellcont/shell/shellcont[1]/shell").expandNode "C"
session.findById("wnd[0]/shellcont/shell/shellcont[1]/shell").expandNode "C.2"
session.findById("wnd[0]/shellcont/shell/shellcont[1]/shell").topNode = "B"

For i = 1 to 3
session.findById("wnd[0]/shellcont/shell/shellcont[1]/shell").selectedNode = "C.2. " + CStr(i)
session.findById("wnd[0]/shellcont/shell/shellcont[1]/shell").doubleClickNode "C.2. " + CStr(i)

session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-FRECDAY").text = "28.06.2019"
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-FRECTIME").text = "09:00:00"
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-LRECTIME").text = "10:00:00"
day = session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-FRECDAY").text
begin_time = session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-FRECTIME").text
end_time = session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/ctxtSAPWLLMINL-LRECTIME").text
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/txtSAPWLLMINL-TIMERES").text = "1"
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/txtSAPWLLMINL-TIMERES").setFocus
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/txtSAPWLLMINL-TIMERES").caretPosition = 2
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1300/btnG_OKCODE").press
session.findById("wnd[0]/shellcont/shell/shellcont[2]/shell").selectedNode = "E"
session.findById("wnd[0]/shellcont/shell/shellcont[2]/shell").doubleClickNode "E"
count = session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").rowCount
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").pressToolbarContextButton "&MB_EXPORT"
session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").selectContextMenuItem "&XXL"
session.findById("wnd[1]/tbar[0]/btn[0]").press
session.findById("wnd[1]/usr/ctxtDY_PATH").text = "D:\Statictics"
session.findById("wnd[1]/usr/ctxtDY_FILENAME").text = "inst_" + Cstr(i) +".XLSX"
session.findById("wnd[1]/usr/ctxtDY_PATH").caretPosition = 3
session.findById("wnd[1]/tbar[0]/btn[11]").press
	For j = 0 to count-1
	session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").currentCellColumn = "RESPMT"
	session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").currentCellRow = j
	time_moment =  session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").getCellValue(j,"TIME")
	session.findById("wnd[0]/usr/ssubSUBSCREEN_0:SAPWL_ST03N:1100/ssubWL_SUBSCREEN_1:SAPWL_ST03N:1110/tabsG_TABSTRIP/tabpTA00/ssubWL_SUBSCREEN_2:SAPWL_ST03N:1130/cntlALVCONTAINER/shellcont/shell").doubleClickCurrentCell
	session.findById("wnd[0]/shellcont[1]/shell").pressToolbarContextButton "&MB_EXPORT"
	session.findById("wnd[0]/shellcont[1]/shell").selectContextMenuItem "&XXL"
	session.findById("wnd[1]/tbar[0]/btn[0]").press
	session.findById("wnd[1]/usr/ctxtDY_PATH").text = "D:\Statictics\PHR\di1phr"
	time_moment = Replace(time_moment, ":","_")
	session.findById("wnd[1]/usr/ctxtDY_FILENAME").text = CStr(i) +"_" + time_moment + ".XLSX"
	session.findById("wnd[1]/usr/ctxtDY_FILENAME").caretPosition = 4
	session.findById("wnd[1]/tbar[0]/btn[11]").press
	session.findById("wnd[0]/shellcont[1]").close
	Next
 Next


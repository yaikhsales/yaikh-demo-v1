import re

path = r"c:\Users\Administrator\Desktop\Yaikh-demo\yaikh-dashboard\src\AppLayout.js"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'title: "QC File",': 'title: "QC File",\n                                                action: "/dashboard/yqms/qc-file",',
    'title: "Pre Production Meeting",': 'title: "Pre Production Meeting",\n                                                action: "/dashboard/yqms/ppm",',
    'title: "Internal Rolling QC",': 'title: "Internal Rolling QC",\n                                                action: "/dashboard/yqms/rolling-qc",',
    'title: "Cutting Inspection",': 'title: "Cutting Inspection",\n                                                action: "/dashboard/yqms/cutting-inspection",',
    'title: "Garment Check Output",': 'title: "Garment Check Output",\n                                                action: "/dashboard/yqms/sewing-output",',
    'title: "Packing Inspection",': 'title: "Packing Inspection",\n                                                action: "/dashboard/yqms/packing-inspection",',
    'title: "Final Inspection",': 'title: "Final Inspection",\n                                                action: "/dashboard/yqms/final-inspection",',
    'title: "QA 20pcs Audit",': 'title: "QA 20pcs Audit",\n                                                action: "/dashboard/yqms/20pcs-audit",',
    'title: "Inline Audit Rolling",': 'title: "Inline Audit Rolling",\n                                                action: "/dashboard/yqms/inline-audit",',
    'title: "Offline Audit",': 'title: "Offline Audit",\n                                                action: "/dashboard/yqms/offline-audit",',
    'title: "QC End Line Checking",': 'title: "QC End Line Checking",\n                                                action: "/dashboard/yqms/endline-check",',
    'title: "First Output Cutting",': 'title: "First Output Cutting",\n                                                action: "/dashboard/yqms/first-output-cutting",',
    'title: "First Output Printing Embroidery",': 'title: "First Output Printing Embroidery",\n                                                action: "/dashboard/yqms/first-output-print",',
    'title: "First Output Sewing",': 'title: "First Output Sewing",\n                                                action: "/dashboard/yqms/first-output-sewing",',
    'title: "QA Cutting",': 'title: "QA Cutting",\n                                                action: "/dashboard/yqms/qa-cutting",',
    'title: "QA Printing Embroidery",': 'title: "QA Printing Embroidery",\n                                                action: "/dashboard/yqms/qa-print",',
    'title: "Cut Panel Inspection",': 'title: "Cut Panel Inspection",\n                                                action: "/dashboard/yqms/cut-panel-inspection",',
    'title: "Printing Inspection",': 'title: "Printing Inspection",\n                                                action: "/dashboard/yqms/printing-inspection",',
    'title: "Embroidery Inspection",': 'title: "Embroidery Inspection",\n                                                action: "/dashboard/yqms/embroidery-inspection",',
    'title: "Finishing Inspection",': 'title: "Finishing Inspection",\n                                                action: "/dashboard/yqms/finishing-inspection",',
    'title: "Ironing Inspection",': 'title: "Ironing Inspection",\n                                                action: "/dashboard/yqms/ironing-inspection",'
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")

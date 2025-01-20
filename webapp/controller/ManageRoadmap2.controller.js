sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("framsys.com.framsysfrontend.controller.ManageRoadmap2", {
        onInit: function () {
            // Initialize the JSON model with sample data
            const oModel = new JSONModel({
                startDate: new Date(),

                "Phases": [
                    {
                        "Title": "Discover",
                        "Tasks": [
                            {
                                "Title": "RISE with SAP Adoption Framework and Entitlement Review",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review the RISE with SAP Adoption Framework"
                                    },
                                    {
                                        "Title": "Review the RISE with SAP Entitlement"
                                    }
                                ]
                            },
                            {
                                "Title": "Strategic Planning",
                                start: new Date(new Date().setMonth(1, 4, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 15, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Create an Innovation Strategy and a High-Level Road Map"
                                    },
                                    {
                                        "Title": "Run an Innovation Discovery and Design Workshop"
                                    },
                                    {
                                        "Title": "Create a 360-Degree View on Security"
                                    },
                                    {
                                        "Title": "Define the Analytics Architecture"
                                    },
                                    {
                                        "Title": "Define Clean Core Success Plan"
                                    }
                                ]
                            },
                            {
                                "Title": "Discovery Assessment",
                                start: new Date(new Date().setMonth(5, 3, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 13, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Executing a SAP Digital Discovery Assessment"
                                    },
                                    {
                                        "Title": "Generate SAP Digital Discovery Report"
                                    }
                                ]
                            },
                            {
                                "Title": "Cloud Trial",
                                start: new Date(new Date().setMonth(3, 6, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 17, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Access a Trial Solution"
                                    }
                                ]
                            },
                            {
                                "Title": "Cloud Mindset Assessment",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(12, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Execute the Cloud Mindset"
                                    },
                                    {
                                        "Title": "Select the Right Cloud Partner"
                                    }
                                ]
                            },
                            {
                                "Title": "Application Value and Scoping",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Discover the Value of SAP S/4HANA Cloud for Your Company"
                                    },
                                    {
                                        "Title": "Review and Request SAP Process Insights"
                                    },
                                    {
                                        "Title": "Identify the value of SAP S/4HANA on Existing Business Processes"
                                    },
                                    {
                                        "Title": "Perform a Digital Value Discovery Workshop"
                                    },
                                    {
                                        "Title": "Perform Benchmarking Assessment for Value Baselining"
                                    },
                                    {
                                        "Title": "Run the Establish the Business Value of User Experience Workshop"
                                    },
                                    {
                                        "Title": "Define the Implementation Strategy"
                                    },
                                    {
                                        "Title": "Create a Strategic Road Map and Value Case"
                                    }
                                ]
                            },
                            {
                                "Title": "Conversion Readiness Assessment",
                                start: new Date(new Date().setMonth(4, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Perform SAP Readiness Check for SAP S/4HANA"
                                    },
                                    {
                                        "Title": "Conduct Functional Review Workshop"
                                    },
                                    {
                                        "Title": "Conduct Technical Review Workshop"
                                    }
                                ]
                            },
                            {
                                "Title": "Operation and Support Assessment",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Operation and Support Assessment"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "Title": "Prepare",
                        "Tasks": [
                            {
                                "Title": "RISE with SAP Onboarding Workshops",
                                start: new Date(new Date().setMonth(1, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review the RISE with SAP Adoption Framework"
                                    },
                                    {
                                        "Title": "Review the RISE with SAP Entitlement"
                                    }
                                ]
                            },
                            {
                                "Title": "Getting Started with your SAP Implementation",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(8, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review Overview Documentation"
                                    },
                                    {
                                        "Title": "Review Onboarding Documentation"
                                    }
                                ]
                            },
                            {
                                "Title": "Supporting Tools for Implementation",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Ensure Project Team Members Access to the SAP for Me and SAP Customer Communities"
                                    },
                                    {
                                        "Title": "Ensure Project Team Members Access to the SAP Learning Hub"
                                    },
                                    {
                                        "Title": "Ensure Project Team Members Access to the SAP Activate Community"
                                    },
                                    {
                                        "Title": "Request Access to SAP Signavio Starter Pack"
                                    },
                                    {
                                        "Title": "Ensure availability of SAP Solution Manager 7.2 (optional)"
                                    }
                                ]
                            },
                            {
                                "Title": "Request Initial System Access",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Request SAP Cloud ALM Tenant"
                                    },
                                    {
                                        "Title": "Request SAP Analytics Cloud"
                                    }
                                ]
                            },
                            {
                                "Title": "Initial System Access for SAP Cloud ALM",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Required Setup for SAP Cloud ALM"
                                    }

                                ]
                            },
                            {
                                "Title": "Initial System Access for SAP Cloud Analytics",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Initial System Access for SAP Analytics Cloud"
                                    }

                                ]
                            },
                            {
                                "Title": "Initial Access for RISE with SAP Systems",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                               
                                "Activities": [
                                    {
                                        "Title": "Receive System Handover Notification"
                                    },
                                    {
                                        "Title": "Set up Users And Assign Authorizations"
                                    }

                                ]
                            },
                            {
                                "Title": "Initial System Access for SAP Business Technology Platform",
                                start: new Date(new Date().setMonth(4, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Access to SAP Business Technology Platform"
                                    },
                                    {
                                        "Title": "Create Users in the SAP Business Technology Platform Cockpit"
                                    },
                                    {
                                        "Title": "Subscribe to Cloud Integration Automation Service within SAP BTP"
                                    },
                                    {
                                        "Title": "Set Up SAP Start and SAP Mobile Start"
                                    }
                                ]

                            },
                            {
                                "Title": "Customer Team Self-Enablement",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Request Knowledge Assessment"
                                    },
                                    {
                                        "Title": "Create Self-Enablement Plan"
                                    },
                                    {
                                        "Title": "Self-Enable on Two-Tier ERP with SAP S/4HANA Cloud"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP Cloud ALM"
                                    },
                                    {
                                        "Title": "Access the SAP S/4HANA Cloud Private Edition Support Value Map and Implementation Learning Room"
                                    },
                                    {
                                        "Title": "Self-Enable on Experience Management"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP Signavio"
                                    },
                                    {
                                        "Title": "Self Enablement On System Conversion"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP Fiori for SAP S/4HANA"
                                    },
                                    {
                                        "Title": "Self-Enable on the Fit-to-Standard Process"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP S/4HANA Migration Cockpit"
                                    },
                                    {
                                        "Title": "Review Self-enablement Materials"
                                    },
                                    {
                                        "Title": "Self-Enable on Test Management and Tools"
                                    },
                                    {
                                        "Title": "Self-Enable on Artificial Intelligence Technologies"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP S/4HANA Cloud Embedded Analytics"
                                    },
                                    {
                                        "Title": "Self-Enable on Extensibility"
                                    },
                                    {
                                        "Title": "Self-Enable on Identity and Access Management and Authorization Concept"
                                    },
                                    {
                                        "Title": "Self-Enable on SAP Business Technology Platform"
                                    }
                                ]


                            },
                            {
                                "Title": "Project Initiation and Governance",
                                start: new Date(new Date().setMonth(4, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Conduct Handover Meeting with Sales Account Team"
                                    },
                                    {
                                        "Title": "Create Project Charter and Scope Statement"
                                    },
                                    {
                                        "Title": "Establish Project Governance"
                                    },
                                    {
                                        "Title": "Establish Solution Standardization Board"
                                    },
                                    {
                                        "Title": "Create Clean Core Runbook in SAP Cloud ALM"
                                    },
                                    {
                                        "Title": "Conduct Clean Core Quality Gate"
                                    },
                                    {
                                        "Title": "Define Project Communications and Reporting"
                                    }
                                ]


                            },
                            {
                                "Title": "Project Plans, Schedule and Budget",
                                start: new Date(new Date().setMonth(7, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Create Project Schedule and Budget"
                                    },
                                    {
                                        "Title": "Assign Resources and Refine Project Tasks in SAP Cloud ALM"
                                    },
                                    {
                                        "Title": "Align Project Schedules"
                                    }
                                ]



                            },
                            {
                                "Title": "Project Standards, Infrastructure, and Solution",
                                start: new Date(new Date().setMonth(8, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(10, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Define Project Standards"
                                    },
                                    {
                                        "Title": "Set Up Project Team Logistics and Infrastructure"
                                    },
                                    {
                                        "Title": "Create a Document Repository for the Implementation Project Team"
                                    },
                                    {
                                        "Title": "Define Standards on Certifications"
                                    }
                                ]




                            },
                            {
                                "Title": "Project Kick-Off and On-Boarding",
                                start: new Date(new Date().setMonth(7, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(11, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "On-board Project Team"
                                    },
                                    {
                                        "Title": "Conduct Kickoff Workshop"
                                    }
                                ]




                            },
                            {
                                "Title": "Change Concept",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(11, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Define Organizational Change Management Roles"
                                    },
                                    {
                                        "Title": "Staff Organizational Change Management Resources"
                                    },
                                    {
                                        "Title": "Define Organizational Change Management Set-up"
                                    }
                                ]





                            },
                            {
                                "Title": "Change Plan",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(8, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Determine Action Areas for Organizational Change Management"
                                    },
                                    {
                                        "Title": "Develop First Version of the Change Plan"
                                    },
                                    {
                                        "Title": "Establish Updating Procedure for the Change Plan"
                                    }
                                ]





                            },
                            {
                                "Title": "Technical Project Preparation",
                                start: new Date(new Date().setMonth(6, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(11, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Check Interoperability"
                                    },
                                    {
                                        "Title": "Review BTP Services"
                                    },
                                    {
                                        "Title": "Define Clean Core Approach"
                                    },
                                    {
                                        "Title": "Basis 2.0"
                                    }
                                ]





                            },
                            {
                                "Title": "Pre-Conversion Projects Execution",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Perform Data Volume Management"
                                    },
                                    {
                                        "Title": "Synchronization of Customers/Vendors into Business partners CVI"
                                    },
                                    {
                                        "Title": "Reconciliation of Financial Data"
                                    },
                                    {
                                        "Title": "Add-On Compatibility"
                                    },
                                    {
                                        "Title": "Cleanup Unused Code"
                                    }
                                ]






                            },
                            {
                                "Title": "Technical Project Preparation",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Check Interoperability"
                                    },
                                    {
                                        "Title": "Review BTP Services"
                                    },
                                    {
                                        "Title": "Define Clean Core Approach"
                                    },
                                    {
                                        "Title": "Basis 2.0"
                                    }
                                ]





                            },
                            {
                                "Title": "Technical Project Preparation",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Check Interoperability"
                                    },
                                    {
                                        "Title": "Review BTP Services"
                                    },
                                    {
                                        "Title": "Define Clean Core Approach"
                                    },
                                    {
                                        "Title": "Basis 2.0"
                                    }
                                ]





                            }
                        ]
                    },
                    {
                        "Title": "Explore",
                        "Tasks": [
                            {
                                "Title": "Execution/Monitoring of Project",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review the SAP S/4HANA Cloud Onboarding Journey"
                                    },
                                    {
                                        "Title": "Direct and Manage Project Execution"
                                    },
                                    {
                                        "Title": "Update Project Management Documents"
                                    },
                                    {
                                        "Title": "Manage Project Issues, Risks, and Changes"
                                    },
                                    {
                                        "Title": "Communicate Project Status and Progress"
                                    },
                                    {
                                        "Title": "Deliver Program Goal Alignment Survey"
                                    }
                                ]

                            },
                            {
                                "Title": "Communication Plan Execution",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Prepare Communication Activities"
                                    },
                                    {
                                        "Title": "Deliver Communication Activities"
                                    },
                                    {
                                        "Title": "Update Communication Plan"
                                    }
                                ]

                            },
                            {
                                "Title": "Stakeholder Analysis",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Conduct Classification of Project Stakeholders"
                                    },
                                    {
                                        "Title": "Identify Executive Sponsors and Project Management Executives"
                                    },
                                    {
                                        "Title": "Identify Key Users and Business Process Experts"
                                    },
                                    {
                                        "Title": "Identify End Users and Consumers (users who benefit from the system)"
                                    }
                                ]

                            },
                            {
                                "Title": "System Conversion Execution of the Sandbox Environment",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(6, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Document System Conversion Runbook"
                                    },
                                    {
                                        "Title": "Technical Pre-Conversion Activities"
                                    },
                                    {
                                        "Title": "Functional Pre-Conversion Activities"
                                    },
                                    {
                                        "Title": "Functional Pre-Conversion Activities: Finance Specific"
                                    },
                                    {
                                        "Title": "System Conversion Execution"
                                    },
                                    {
                                        "Title": "Functional Post-Conversion Activities"
                                    },
                                    {
                                        "Title": "Functional Post-Conversion Activities: Finance Specific"
                                    }
                                ]

                            }

                        ]
                    },
                    {
                        "Title": "Realize",
                        "Tasks": [
                            {
                                "Title": "Execution/Monitoring of Project",
                                start: new Date(new Date().setMonth(1, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(4, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review the SAP S/4HANA Cloud Onboarding Journey"
                                    },
                                    {
                                        "Title": "Direct and Manage Project Execution"
                                    },
                                    {
                                        "Title": "Plan and Execute Agile Sprints"
                                    },
                                    {
                                        "Title": "Update Project Management Documents"
                                    },
                                    {
                                        "Title": "Manage Project Issues, Risks, and Changes"
                                    },
                                    {
                                        "Title": "Communicate Project Status and Progress"
                                    },
                                    {
                                        "Title": "Enablement Content Development"
                                    },
                                    {
                                        "Title": "Create a Content Creation Plan"
                                    },
                                    {
                                        "Title": "Manage Content Development Plan"
                                    }
                                ]


                            },
                            {
                                "Title": "Detailed Change Impact Analysis",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Prepare Change Impact Workshops"
                                    },
                                    {
                                        "Title": "Conduct Change Impact Assessment"
                                    },
                                    {
                                        "Title": "Manage Change Impacts"
                                    }
                                ]



                            },
                            {
                                "Title": "Initial Quality System Setup",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Transport Fiori Rapid Activation"
                                    },
                                    {
                                        "Title": "Setup Quality System for New Implementation"
                                    },
                                    {
                                        "Title": "Setup Quality System for System Conversion"
                                    }
                                ]




                            },
                            {
                                "Title": "Solution Configuration",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Run Handover Session"
                                    },
                                    {
                                        "Title": "Create the Custom Business Roles for SAP Fiori"
                                    },
                                    {
                                        "Title": "Configure Master Data"
                                    },
                                    {
                                        "Title": "Configure Core Finance"
                                    },
                                    {
                                        "Title": "Perform Main Configuration"
                                    },
                                    {
                                        "Title": "Run Unit Test"
                                    },
                                    {
                                        "Title": "Run String Test"
                                    },
                                    {
                                        "Title": "Run Solution Walk-Through"
                                    },
                                    {
                                        "Title": "Resolve Identified Issues"
                                    },
                                    {
                                        "Title": "Document Configured Settings"
                                    }
                                ]




                            },
                            {
                                "Title": "Product Enhancementss",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Adjust Affected Existing Custom Code"
                                    },
                                    {
                                        "Title": "Development of Clean Core Compliant Extensions"
                                    },
                                    {
                                        "Title": "Enhancement and Development of User Interface"
                                    },
                                    {
                                        "Title": "Custom Development"
                                    }
                                ]




                            },
                            {
                                "Title": "Output Management Setup in the Quality/Test System",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Set Up Printers"
                                    },
                                    {
                                        "Title": "Set Up Email"
                                    },
                                    {
                                        "Title": "Customize Form Templates"
                                    },
                                    {
                                        "Title": "Customize Email Templates"
                                    },
                                    {
                                        "Title": "Transport Custom Objects from Quality to Production System"
                                    }
                                ]




                            }
                        ]
                    },
                    {
                        "Title": "Deploy",
                        "Tasks": [
                            {
                                "Title": "Execution/Monitoring",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Review the SAP S/4HANA Cloud Onboarding Journey"
                                    },
                                    {
                                        "Title": "Direct and Manage Project Execution"
                                    },
                                    {
                                        "Title": "Manage Project Issues, Risks, and Changes"
                                    },
                                    {
                                        "Title": "Update Project Management Documents"
                                    },
                                    {
                                        "Title": "Communicate Project Status and Progress"
                                    }
                                ]





                            },
                            {
                                "Title": "Operations Readiness",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(7, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Operational Readiness"
                                    },
                                    {
                                        "Title": "Tracking Goals"
                                    }
                                ]




                            },
                            {
                                "Title": "Dress Rehearsal",
                                start: new Date(new Date().setMonth(1, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Perform Dress Rehearsal"
                                    }

                                ]




                            },
                            {
                                "Title": "Production Cutover",
                                start: new Date(new Date().setMonth(6, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Execute Cutover Tasks per the Cutover Plan"
                                    }

                                ]




                            },
                            {
                                "Title": "System Go-Live",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(4, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Production System to Livel"
                                    }

                                ]




                            },
                            {
                                "Title": "Production Hypercare Support",
                                start: new Date(new Date().setMonth(7, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(10, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Provide Hypercare Support"
                                    }

                                ]




                            },
                            {
                                "Title": "Phase Closure and Sign-Off Phase Deliverables",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Conduct Project Quality Gate"
                                    },
                                    {
                                        "Title": "Assess Project Performance"
                                    },
                                    {
                                        "Title": "Obtain Customer Sign-Off for Phase/Project Completion"
                                    },
                                    {
                                        "Title": "SAP S/4HANA Cloud Private Edition - Released Version March 25th, 2024"
                                    }
                                ]





                            }


                        ]
                    },
                    {
                        "Title": "Run",
                        "Tasks": [
                            {
                                "Title": "Service Management",
                                start: new Date(new Date().setMonth(1, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(5, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Establish Service Management Framework"
                                    },
                                    {
                                        "Title": "Access SAP Support Service"
                                    }
                                ]





                            },
                            {
                                "Title": "Ongoing System Operations",
                                start: new Date(new Date().setMonth(2, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(10, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Operate the New Solution"
                                    },
                                    {
                                        "Title": "Verify User Authorizations / Classification in Production Systems"
                                    },
                                    {
                                        "Title": "Review Upcoming Legal Changes"
                                    },
                                    {
                                        "Title": "Monitor the New System"
                                    },
                                    {
                                        "Title": "Perform Technical Assessment"
                                    },
                                    {
                                        "Title": "Monitor SAP Build Process Automation Jobs"
                                    },
                                    {
                                        "Title": "Continuously Optimize IT Operations"
                                    }
                                ]





                            },
                            {
                                "Title": "Governance Model",
                                start: new Date(new Date().setMonth(5, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(11, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type05",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Establish Governance Model"
                                    },
                                    {
                                        "Title": "Manage Change Request"
                                    }
                                ]





                            },
                            {
                                "Title": "User Experience Management Tool Deployment",
                                start: new Date(new Date().setMonth(4, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Analyse Data"
                                    },
                                    {
                                        "Title": "Execute Technical Implementation"
                                    }
                                ]






                            },
                            {
                                "Title": "Incident and Problem Management",
                                start: new Date(new Date().setMonth(3, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(9, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type01",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Manage Incident"
                                    },
                                    {
                                        "Title": "Manage Problem"
                                    }
                                ]





                            },
                            {
                                "Title": "Production Hypercare Support",
                                start: new Date(new Date().setMonth(9, 1, 0, 0, 0)), // September 1
                                end: new Date(new Date().setMonth(12, 10, 0, 0, 0)), // September 1, 10:00 AM
                                info: "RISE with SAP Adoption Framework and Entitlement Review",
                                type: "Type07",
                                tentative: false,
                                "Activities": [
                                    {
                                        "Title": "Provide Hypercare Support"
                                    }

                                ]




                            },
                        ]
                    }
                ]

            });
            this.getView().setModel(oModel);
        },
        roles: {
         donna: "Donna Moore",
         manager: "manager",
        admin: "admin"
        },


        handleRoleChange: function () {
            this.getView().getModel().refresh(true);
        },

        getUserRole: function () {
            return this.roles[this.byId("userRole").getSelectedKey()];
        },

        canModifyAppointments: function (sRole) {
            var sUserRole = this.getUserRole();

            if (sUserRole === this.roles.manager || sUserRole === this.roles.admin || sUserRole === sRole) {
                return true;
            }
        },

        handleAppointmentDragEnter: function (oEvent) {
            if (this.isAppointmentOverlap(oEvent, oEvent.getParameter("calendarRow"))) {
                oEvent.preventDefault();
            }
        },

        handleAppointmentDrop: function (oEvent) {
            var oAppointment = oEvent.getParameter("appointment"),
                oStartDate = oEvent.getParameter("startDate"),
                oEndDate = oEvent.getParameter("endDate"),
                oCalendarRow = oEvent.getParameter("calendarRow"),
                bCopy = oEvent.getParameter("copy"),
                sTitle = oAppointment.getTitle(),
                oModel = this.getView().getModel(),
                oAppBindingContext = oAppointment.getBindingContext(),
                oRowBindingContext = oCalendarRow.getBindingContext(),
                handleAppointmentDropBetweenRows = function () {
                    var aPath = oAppBindingContext.getPath().split("/"),
                        iIndex = aPath.pop(),
                        sRowAppointmentsPath = aPath.join("/");

                    oRowBindingContext.getObject().appointments.push(
                        oModel.getProperty(oAppBindingContext.getPath())
                    );

                    oModel.getProperty(sRowAppointmentsPath).splice(iIndex, 1);
                };

            if (bCopy) { // "copy" appointment
                var oProps = Object.assign({}, oModel.getProperty(oAppointment.getBindingContext().getPath()));
                oProps.start = oStartDate;
                oProps.end = oEndDate;

                oRowBindingContext.getObject().appointments.push(oProps);
            } else { // "move" appointment
                oModel.setProperty("start", oStartDate, oAppBindingContext);
                oModel.setProperty("end", oEndDate, oAppBindingContext);

                if (oAppointment.getParent() !== oCalendarRow) {
                    handleAppointmentDropBetweenRows();
                }
            }

            oModel.refresh(true);

            MessageToast.show(oCalendarRow.getTitle() + "'s '" + "Appointment '" + sTitle + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");
        },

        handleAppointmentResize: function (oEvent) {
            var oAppointment = oEvent.getParameter("appointment"),
                oStartDate = oEvent.getParameter("startDate"),
                oEndDate = oEvent.getParameter("endDate");

            if (!this.isAppointmentOverlap(oEvent, oAppointment.getParent())) {
                MessageToast.show("Appointment '" + oAppointment.getTitle() + "' now starts at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");

                oAppointment
                    .setStartDate(oStartDate)
                    .setEndDate(oEndDate);
            } else {
                MessageToast.show("As a manager you can not resize events if they overlap with another events");
            }
        },

        handleAppointmentCreate: function (oEvent) {
            var oStartDate = oEvent.getParameter("startDate"),
                oEndDate = oEvent.getParameter("endDate"),
                oPlanningCalendarRow = oEvent.getParameter("calendarRow"),
                oModel = this.getView().getModel(),
                sPath = oPlanningCalendarRow.getBindingContext().getPath();

            oModel.getProperty(sPath).appointments.push({
                title: "New Appointment",
                start: oStartDate,
                end: oEndDate
            });

            MessageToast.show("New Appointment is created at \n" + oStartDate + "\n and end at \n" + oEndDate + ".");

            oModel.refresh(true);
        },

        isAppointmentOverlap: function (oEvent, oCalendarRow) {
            var oAppointment = oEvent.getParameter("appointment"),
                oStartDate = oEvent.getParameter("startDate"),
                oEndDate = oEvent.getParameter("endDate"),
                bAppointmentOverlapped;

            if (this.getUserRole() === this.roles.manager) {
                bAppointmentOverlapped = oCalendarRow.getAppointments().some(function (oCurrentAppointment) {
                    if (oCurrentAppointment === oAppointment) {
                        return;
                    }

                    var oAppStartTime = oCurrentAppointment.getStartDate().getTime(),
                        oAppEndTime = oCurrentAppointment.getEndDate().getTime();

                    if (oAppStartTime <= oStartDate.getTime() && oStartDate.getTime() < oAppEndTime) {
                        return true;
                    }

                    if (oAppStartTime < oEndDate.getTime() && oEndDate.getTime() <= oAppEndTime) {
                        return true;
                    }

                    if (oStartDate.getTime() <= oAppStartTime && oAppStartTime < oEndDate.getTime()) {
                        return true;
                    }
                });
            }

            return bAppointmentOverlapped;
        },
        
onPress:function(){
    this.getOwnerComponent().getRouter().navTo("ManageTask");
}

    });
});
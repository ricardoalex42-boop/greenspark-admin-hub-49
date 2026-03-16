export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action_type: string
          created_at: string | null
          description: string
          facility_id: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description: string
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string
          facility_id?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      alert_ai_conversations: {
        Row: {
          alert_id: string | null
          created_at: string | null
          id: string
          messages: Json
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_id?: string | null
          created_at?: string | null
          id?: string
          messages?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_id?: string | null
          created_at?: string | null
          id?: string
          messages?: Json
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alert_ai_conversations_alert_id_fkey"
            columns: ["alert_id"]
            isOneToOne: false
            referencedRelation: "live_alerts"
            referencedColumns: ["id"]
          },
        ]
      }
      batch_transfers: {
        Row: {
          batch_id: string | null
          created_at: string | null
          from_facility_id: string | null
          id: string
          metrc_transfer_id: string | null
          quantity: number
          status: string | null
          to_facility_id: string | null
          transfer_date: string
          unit: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          from_facility_id?: string | null
          id?: string
          metrc_transfer_id?: string | null
          quantity: number
          status?: string | null
          to_facility_id?: string | null
          transfer_date: string
          unit?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          from_facility_id?: string | null
          id?: string
          metrc_transfer_id?: string | null
          quantity?: number
          status?: string | null
          to_facility_id?: string | null
          transfer_date?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_transfers_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_transfers_from_facility_id_fkey"
            columns: ["from_facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_transfers_to_facility_id_fkey"
            columns: ["to_facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      batches: {
        Row: {
          batch_tag: string
          coa_status: string | null
          created_at: string | null
          expiry_date: string | null
          facility_id: string | null
          harvest_date: string | null
          id: string
          metrc_tag: string | null
          packaged_date: string | null
          product_type: string | null
          quantity: number
          status: string | null
          strain: string | null
          unit: string | null
        }
        Insert: {
          batch_tag: string
          coa_status?: string | null
          created_at?: string | null
          expiry_date?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          metrc_tag?: string | null
          packaged_date?: string | null
          product_type?: string | null
          quantity: number
          status?: string | null
          strain?: string | null
          unit?: string | null
        }
        Update: {
          batch_tag?: string
          coa_status?: string | null
          created_at?: string | null
          expiry_date?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          metrc_tag?: string | null
          packaged_date?: string | null
          product_type?: string | null
          quantity?: number
          status?: string | null
          strain?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "batches_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      compliance_scores: {
        Row: {
          active_risks: number | null
          calculated_at: string | null
          facility_id: string | null
          id: string
          last_sync_at: string | null
          next_check_date: string | null
          score: number
          status: string | null
        }
        Insert: {
          active_risks?: number | null
          calculated_at?: string | null
          facility_id?: string | null
          id?: string
          last_sync_at?: string | null
          next_check_date?: string | null
          score: number
          status?: string | null
        }
        Update: {
          active_risks?: number | null
          calculated_at?: string | null
          facility_id?: string | null
          id?: string
          last_sync_at?: string | null
          next_check_date?: string | null
          score?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_scores_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      document_access_log: {
        Row: {
          accessed_at: string | null
          action: string | null
          document_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          accessed_at?: string | null
          action?: string | null
          document_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          accessed_at?: string | null
          action?: string | null
          document_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_access_log_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          document_type: string | null
          download_count: number | null
          expiry_date: string | null
          facility_id: string | null
          facility_type: string | null
          file_size_bytes: number | null
          file_url: string | null
          id: string
          is_system_document: boolean | null
          organization_id: string | null
          state: string | null
          status: string | null
          title: string
          updated_at: string | null
          uploaded_by: string | null
          version: string | null
          view_count: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          download_count?: number | null
          expiry_date?: string | null
          facility_id?: string | null
          facility_type?: string | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_system_document?: boolean | null
          organization_id?: string | null
          state?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          uploaded_by?: string | null
          version?: string | null
          view_count?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          document_type?: string | null
          download_count?: number | null
          expiry_date?: string | null
          facility_id?: string | null
          facility_type?: string | null
          file_size_bytes?: number | null
          file_url?: string | null
          id?: string
          is_system_document?: boolean | null
          organization_id?: string | null
          state?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          uploaded_by?: string | null
          version?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_training_records: {
        Row: {
          certificate_url: string | null
          completed_date: string | null
          course_id: string | null
          created_at: string | null
          employee_id: string | null
          expiry_date: string | null
          id: string
          score: number | null
          status: string | null
        }
        Insert: {
          certificate_url?: string | null
          completed_date?: string | null
          course_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          expiry_date?: string | null
          id?: string
          score?: number | null
          status?: string | null
        }
        Update: {
          certificate_url?: string | null
          completed_date?: string | null
          course_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          expiry_date?: string | null
          id?: string
          score?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_training_records_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "training_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_training_records_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          badge_number: string | null
          created_at: string | null
          facility_id: string | null
          full_name: string
          hire_date: string | null
          id: string
          role: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          badge_number?: string | null
          created_at?: string | null
          facility_id?: string | null
          full_name: string
          hire_date?: string | null
          id?: string
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          badge_number?: string | null
          created_at?: string | null
          facility_id?: string | null
          full_name?: string
          hire_date?: string | null
          id?: string
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          created_at: string | null
          facility_type: string | null
          id: string
          last_synced_at: string | null
          license_number: string
          metrc_connected: boolean | null
          name: string
          organization_id: string | null
          state: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          facility_type?: string | null
          id?: string
          last_synced_at?: string | null
          license_number: string
          metrc_connected?: boolean | null
          name: string
          organization_id?: string | null
          state: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          facility_type?: string | null
          id?: string
          last_synced_at?: string | null
          license_number?: string
          metrc_connected?: boolean | null
          name?: string
          organization_id?: string | null
          state?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facilities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_integrations: {
        Row: {
          api_key_encrypted: string | null
          api_secret_encrypted: string | null
          config: Json | null
          connected_at: string | null
          connected_by: string | null
          created_at: string | null
          facility_id: string | null
          id: string
          integration_id: string | null
          last_successful_sync_at: string | null
          status: string | null
          sync_frequency_minutes: number | null
        }
        Insert: {
          api_key_encrypted?: string | null
          api_secret_encrypted?: string | null
          config?: Json | null
          connected_at?: string | null
          connected_by?: string | null
          created_at?: string | null
          facility_id?: string | null
          id?: string
          integration_id?: string | null
          last_successful_sync_at?: string | null
          status?: string | null
          sync_frequency_minutes?: number | null
        }
        Update: {
          api_key_encrypted?: string | null
          api_secret_encrypted?: string | null
          config?: Json | null
          connected_at?: string | null
          connected_by?: string | null
          created_at?: string | null
          facility_id?: string | null
          id?: string
          integration_id?: string | null
          last_successful_sync_at?: string | null
          status?: string | null
          sync_frequency_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_integrations_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_integrations_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      inspection_readiness: {
        Row: {
          created_at: string | null
          facility_id: string | null
          id: string
          last_mock_audit_date: string | null
          open_issues: number | null
          overall_score: number | null
          pending_items: number | null
        }
        Insert: {
          created_at?: string | null
          facility_id?: string | null
          id?: string
          last_mock_audit_date?: string | null
          open_issues?: number | null
          overall_score?: number | null
          pending_items?: number | null
        }
        Update: {
          created_at?: string | null
          facility_id?: string | null
          id?: string
          last_mock_audit_date?: string | null
          open_issues?: number | null
          overall_score?: number | null
          pending_items?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inspection_readiness_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_access_requests: {
        Row: {
          created_at: string | null
          id: string
          integration_name: string
          organization_id: string | null
          requested_by: string | null
          status: string | null
          use_case: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          integration_name: string
          organization_id?: string | null
          requested_by?: string | null
          status?: string | null
          use_case?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          integration_name?: string
          organization_id?: string | null
          requested_by?: string | null
          status?: string | null
          use_case?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_access_requests_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_activity_log: {
        Row: {
          created_at: string | null
          event_type: string | null
          facility_id: string | null
          id: string
          integration_id: string | null
          message: string
          metadata: Json | null
          triggered_by: string | null
        }
        Insert: {
          created_at?: string | null
          event_type?: string | null
          facility_id?: string | null
          id?: string
          integration_id?: string | null
          message: string
          metadata?: Json | null
          triggered_by?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string | null
          facility_id?: string | null
          id?: string
          integration_id?: string | null
          message?: string
          metadata?: Json | null
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "integration_activity_log_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "integration_activity_log_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations_catalog: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
          status: string | null
          supports_sync: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          status?: string | null
          supports_sync?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          status?: string | null
          supports_sync?: boolean | null
        }
        Relationships: []
      }
      lab_tests: {
        Row: {
          batch_id: string | null
          cbd_percentage: number | null
          coa_url: string | null
          created_at: string | null
          expiry_date: string | null
          facility_id: string | null
          id: string
          lab_name: string
          status: string | null
          test_date: string
          test_type: string | null
          thc_percentage: number | null
        }
        Insert: {
          batch_id?: string | null
          cbd_percentage?: number | null
          coa_url?: string | null
          created_at?: string | null
          expiry_date?: string | null
          facility_id?: string | null
          id?: string
          lab_name: string
          status?: string | null
          test_date: string
          test_type?: string | null
          thc_percentage?: number | null
        }
        Update: {
          batch_id?: string | null
          cbd_percentage?: number | null
          coa_url?: string | null
          created_at?: string | null
          expiry_date?: string | null
          facility_id?: string | null
          id?: string
          lab_name?: string
          status?: string | null
          test_date?: string
          test_type?: string | null
          thc_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      live_alerts: {
        Row: {
          action_url: string | null
          category: string | null
          created_at: string | null
          dismissed: boolean | null
          dismissed_at: string | null
          dismissed_by: string | null
          facility_id: string | null
          id: string
          message: string
          reference_id: string | null
          reference_type: string | null
          severity: string
          source: string | null
          title: string
        }
        Insert: {
          action_url?: string | null
          category?: string | null
          created_at?: string | null
          dismissed?: boolean | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          facility_id?: string | null
          id?: string
          message: string
          reference_id?: string | null
          reference_type?: string | null
          severity: string
          source?: string | null
          title: string
        }
        Update: {
          action_url?: string | null
          category?: string | null
          created_at?: string | null
          dismissed?: boolean | null
          dismissed_at?: string | null
          dismissed_by?: string | null
          facility_id?: string | null
          id?: string
          message?: string
          reference_id?: string | null
          reference_type?: string | null
          severity?: string
          source?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "live_alerts_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_inspection_reports: {
        Row: {
          attention_items: number | null
          complete_items: number | null
          facility_id: string | null
          findings: Json | null
          generated_at: string | null
          generated_by: string | null
          id: string
          overall_score: number | null
          pending_items: number | null
          readiness_snapshot: Json
          report_url: string | null
          total_items: number | null
        }
        Insert: {
          attention_items?: number | null
          complete_items?: number | null
          facility_id?: string | null
          findings?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          overall_score?: number | null
          pending_items?: number | null
          readiness_snapshot: Json
          report_url?: string | null
          total_items?: number | null
        }
        Update: {
          attention_items?: number | null
          complete_items?: number | null
          facility_id?: string | null
          findings?: Json | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          overall_score?: number | null
          pending_items?: number | null
          readiness_snapshot?: Json
          report_url?: string | null
          total_items?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mock_inspection_reports_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          email_enabled: boolean | null
          id: string
          in_app_enabled: boolean | null
          notify_coa_expiring: boolean | null
          notify_inspection_upcoming: boolean | null
          notify_license_expiring: boolean | null
          notify_sop_review_due: boolean | null
          notify_training_expiring: boolean | null
          reminder_days_before: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          notify_coa_expiring?: boolean | null
          notify_inspection_upcoming?: boolean | null
          notify_license_expiring?: boolean | null
          notify_sop_review_due?: boolean | null
          notify_training_expiring?: boolean | null
          reminder_days_before?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          notify_coa_expiring?: boolean | null
          notify_inspection_upcoming?: boolean | null
          notify_license_expiring?: boolean | null
          notify_sop_review_due?: boolean | null
          notify_training_expiring?: boolean | null
          reminder_days_before?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          email_sent: boolean | null
          facility_id: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          facility_id?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          email_sent?: boolean | null
          facility_id?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          plan: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          plan?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          plan?: string | null
        }
        Relationships: []
      }
      pesticide_applications: {
        Row: {
          application_date: string
          application_method: string | null
          applied_by: string | null
          batch_ids: string[] | null
          created_at: string | null
          epa_registration_number: string | null
          facility_id: string | null
          id: string
          location: string | null
          notes: string | null
          pre_harvest_interval_days: number | null
          product_name: string
          quantity_used: number | null
          target_pest: string | null
          unit: string | null
        }
        Insert: {
          application_date: string
          application_method?: string | null
          applied_by?: string | null
          batch_ids?: string[] | null
          created_at?: string | null
          epa_registration_number?: string | null
          facility_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          pre_harvest_interval_days?: number | null
          product_name: string
          quantity_used?: number | null
          target_pest?: string | null
          unit?: string | null
        }
        Update: {
          application_date?: string
          application_method?: string | null
          applied_by?: string | null
          batch_ids?: string[] | null
          created_at?: string | null
          epa_registration_number?: string | null
          facility_id?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          pre_harvest_interval_days?: number | null
          product_name?: string
          quantity_used?: number | null
          target_pest?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pesticide_applications_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      plants: {
        Row: {
          created_at: string | null
          destroyed_reason: string | null
          facility_id: string | null
          harvest_date: string | null
          id: string
          is_mother: boolean | null
          location: string | null
          metrc_tag: string | null
          planted_date: string | null
          stage: string | null
          strain: string
        }
        Insert: {
          created_at?: string | null
          destroyed_reason?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          is_mother?: boolean | null
          location?: string | null
          metrc_tag?: string | null
          planted_date?: string | null
          stage?: string | null
          strain: string
        }
        Update: {
          created_at?: string | null
          destroyed_reason?: string | null
          facility_id?: string | null
          harvest_date?: string | null
          id?: string
          is_mother?: boolean | null
          location?: string | null
          metrc_tag?: string | null
          planted_date?: string | null
          stage?: string | null
          strain?: string
        }
        Relationships: [
          {
            foreignKeyName: "plants_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          default_facility_id: string | null
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          default_facility_id?: string | null
          full_name?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          default_facility_id?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_default_facility_id_fkey"
            columns: ["default_facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      readiness_categories: {
        Row: {
          category_name: string
          completed_items: number | null
          created_at: string | null
          id: string
          readiness_id: string | null
          score: number | null
          total_items: number | null
        }
        Insert: {
          category_name: string
          completed_items?: number | null
          created_at?: string | null
          id?: string
          readiness_id?: string | null
          score?: number | null
          total_items?: number | null
        }
        Update: {
          category_name?: string
          completed_items?: number | null
          created_at?: string | null
          id?: string
          readiness_id?: string | null
          score?: number | null
          total_items?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "readiness_categories_readiness_id_fkey"
            columns: ["readiness_id"]
            isOneToOne: false
            referencedRelation: "inspection_readiness"
            referencedColumns: ["id"]
          },
        ]
      }
      readiness_checklist_items: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_system_item: boolean | null
          item_name: string
          linked_filter: Json | null
          linked_table: string | null
          regulation_reference: string | null
          status: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_system_item?: boolean | null
          item_name: string
          linked_filter?: Json | null
          linked_table?: string | null
          regulation_reference?: string | null
          status?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_system_item?: boolean | null
          item_name?: string
          linked_filter?: Json | null
          linked_table?: string | null
          regulation_reference?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "readiness_checklist_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "readiness_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sop_versions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          change_summary: string | null
          created_at: string | null
          file_url: string | null
          id: string
          sop_id: string | null
          version: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          change_summary?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          sop_id?: string | null
          version: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          change_summary?: string | null
          created_at?: string | null
          file_url?: string | null
          id?: string
          sop_id?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "sop_versions_sop_id_fkey"
            columns: ["sop_id"]
            isOneToOne: false
            referencedRelation: "sops"
            referencedColumns: ["id"]
          },
        ]
      }
      sops: {
        Row: {
          category: string | null
          created_at: string | null
          current_version: string | null
          facility_id: string | null
          id: string
          next_review_date: string | null
          owner_id: string | null
          review_frequency_days: number | null
          status: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          current_version?: string | null
          facility_id?: string | null
          id?: string
          next_review_date?: string | null
          owner_id?: string | null
          review_frequency_days?: number | null
          status?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          current_version?: string | null
          facility_id?: string | null
          id?: string
          next_review_date?: string | null
          owner_id?: string | null
          review_frequency_days?: number | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sops_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          facility_limit: number | null
          id: string
          organization_id: string | null
          plan: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          facility_limit?: number | null
          id?: string
          organization_id?: string | null
          plan: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          facility_limit?: number | null
          id?: string
          organization_id?: string | null
          plan?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      training_courses: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          organization_id: string | null
          recurrence_days: number | null
          required_for_roles: string[] | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          organization_id?: string | null
          recurrence_days?: number | null
          required_for_roles?: string[] | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          organization_id?: string | null
          recurrence_days?: number | null
          required_for_roles?: string[] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_courses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      waste_disposal_logs: {
        Row: {
          batch_id: string | null
          created_at: string | null
          disposal_date: string
          disposal_method: string | null
          disposed_by: string | null
          facility_id: string | null
          id: string
          metrc_waste_id: string | null
          notes: string | null
          quantity: number
          unit: string | null
          waste_type: string | null
          witness_name: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          disposal_date: string
          disposal_method?: string | null
          disposed_by?: string | null
          facility_id?: string | null
          id?: string
          metrc_waste_id?: string | null
          notes?: string | null
          quantity: number
          unit?: string | null
          waste_type?: string | null
          witness_name?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          disposal_date?: string
          disposal_method?: string | null
          disposed_by?: string | null
          facility_id?: string | null
          id?: string
          metrc_waste_id?: string | null
          notes?: string | null
          quantity?: number
          unit?: string | null
          waste_type?: string | null
          witness_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "waste_disposal_logs_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "waste_disposal_logs_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

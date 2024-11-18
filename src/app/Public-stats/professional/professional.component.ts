import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { commonService } from 'src/app/services/common.service';
import { API_PATH } from 'src/environments/api-constant';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProfessionalComponent implements OnInit {
  searchForm!: FormGroup;
  filteredProfessionals: any[] = [];
  selectedProfessional: any = null;
  apiConstant: any = API_PATH;
  loading: boolean = false;
  consultants: any[] = [];
  isLoading: boolean = true;

  // Pagination variables
  currentPage: number = 1;  // Default to first page
  pageSize: number = 10;  // Show 10 consultants per page
  totalPages: number = 1;  // Total pages based on data length
  paginatedConsultants: any[] = [];  // Consultants to display on the current page

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private service: commonService,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    });

    // Fetch consultants when the component initializes
    this.fetchConsultantRecords();
  }

  fetchConsultantRecords(): void {
    this.isLoading = true;

    this.service.getDeptDashboard(this.apiConstant.allconsultantlist, "").subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response && response.httpStatus === 'OK') {
          this.consultants = response.data;
          this.totalPages = Math.ceil(this.consultants.length / this.pageSize);
          this.updatePaginatedConsultants();
        } else {
          this.toastr.warning('No consultants found.');
          this.consultants = [];
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error('Failed to fetch consultant records.');
        console.error(err);
      }
    });
  }

  // Update the paginated consultants to show only the records for the current page
  updatePaginatedConsultants(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedConsultants = this.consultants.slice(startIndex, endIndex);
  }

  // Change the current page and update the displayed consultants
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedConsultants();
  }

  // Filter professionals based on search query
  filterProfessionals(searchQuery: string): void {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      this.filteredProfessionals = [];
      return;
    }

    this.loading = true;

    const requestPayload = { searchData: trimmedQuery };

    this.service.getDeptDashboards(this.apiConstant.allproffesionals, requestPayload).subscribe(
      (response: any) => {
        this.loading = false;
        if (response && response.httpStatus === 'OK') {
          this.filteredProfessionals = response.data;
          if (this.filteredProfessionals.length === 0) {
            this.toastr.info('No professionals found for the search query.');
          }
        } else {
          alert('Sorry this data is not found.');
          this.filteredProfessionals = [];
        }
      },
      (error) => {
        this.loading = false;
        this.toastr.error('An error occurred while fetching professionals.');
        console.error(error);
      }
    );
  }

  // Show the details of the selected professional
  showDetails(professional: any): void {
    this.selectedProfessional = professional;
    this.disableFormControls();
  }

  // Disable the form controls
  disableFormControls(): void {
    this.searchForm.get('searchQuery')?.disable();
  }

  // Reset the search form and re-enable form controls
  resetSearch(): void {
    this.searchForm.reset();
    this.selectedProfessional = null;
    this.filteredProfessionals = [];
    this.enableFormControls();
  }

  // Enable the form controls
  enableFormControls(): void {
    this.searchForm.get('searchQuery')?.enable();
  }
  returnhome(){
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = 'http://172.16.5.82:8001/api';
  constructor(private http: HttpClient) { }

  createProject(data: any): Observable<any> {

    const url = `${this.baseUrl}/create-project`;
    return this.http.post(url, data);
  }


  deleteProject(projectName: string): Observable<any> {
    const url = `${this.baseUrl}/delete-projects?projectName=${encodeURIComponent(projectName)}`;
    console.log("inside delete project");
    console.log(url);
    return this.http.delete(url);


  }



  downloadZip(projectName:string): void {
    // const url = `${this.baseUrl}/download-zip`;
    const url = `${this.baseUrl}/download-zip?projectName=${encodeURIComponent(projectName)}`;
    console.log(url);

    this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/zip' });
        const fileName = projectName + ".zip"; // Name of the downloaded file
        saveAs(blob, fileName);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  // Send POST request with data
  postData(data: any): Observable<any> {
    const url = `${this.baseUrl}/post-endpoint`;
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }

  // Send PUT request with data
  updateData(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}/update-endpoint/${id}`;
    return this.http.put(url, data).pipe(
      catchError(this.handleError)
    );
  }

  // Send DELETE request
  deleteData(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete-endpoint/${id}`; // Replace with your actual DELETE endpoint
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }
}

import { Injectable } from '@nestjs/common';
import {
  AllReport,
  Report,
  ReportRepository,
} from '../../../../domain/report.domain';
import * as admin from 'firebase-admin';
import { Profile } from 'src/domain/profile.domain';
import { PostDomain } from 'src/domain/post.domain';

@Injectable()
export class FirestoreService implements ReportRepository {
  private db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  create(report: Object) {
    let reportRef = this.db.collection('reports').doc();
    reportRef
      .set({
        ...report,
        id: reportRef.id,
        createdAt: new Date(),
        updatedAt: null,
        status: 'pending',
      } as Report)
      .then();
  }

  async getAll(): Promise<Report[]> {
    const reportRef = this.db.collection('reports');
    const snapshot = await reportRef.get();
    const reports = snapshot.docs.map((doc) => doc.data() as Report);
    return reports;
  }

  async getAllByStatusCompleted(page: number): Promise<AllReport> {
    const reportRef = this.db.collection('reports');
    const snapshot = await reportRef.where('status', '==', 'completed').get();
    const reports = snapshot.docs.map((doc) => doc.data() as Report);
    const size = 9;
    return {
      data: reports.slice((page - 1) * size, page * size),
      endPage: Math.ceil(reports.length / size),
    };
  }

  async getAllByStatusPending(page: number, type: string): Promise<AllReport> {
    const reportRef = this.db.collection('reports');
    const snapshot = await reportRef
      .where('status', '==', 'pending')
      .where('type', '==', type)
      .get();
    const reports = snapshot.docs.map((doc) => doc.data() as Report);
    const size = 30;
    return {
      data: reports.slice((page - 1) * size, page * size),
      endPage: Math.ceil(reports.length / size),
    };
  }

  update(id: string) {
    let reportRef = this.db.collection('reports').doc(id);
    reportRef.update({ status: 'completed', updatedAt: new Date() }).then();
  }
}

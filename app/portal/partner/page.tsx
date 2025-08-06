'use client'

import { useState } from 'react'
import { Package, TrendingUp, Recycle, QrCode, ChevronDown, FileText, Calendar, Download, AlertCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { DataTable, Column } from '../../components/ui/data-table'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion'

interface Bin {
  id: string
  location: string
  status: 'Ready' | 'Full' | 'Partial'
  capacity: string
  lastPickup: string
  nextPickup: string
}

interface Activity {
  id: string
  type: string
  description: string
  date: string
  status: 'Completed' | 'Scheduled' | 'In Progress'
}

interface Document {
  id: string
  name: string
  type: string
  status: 'Active' | 'Complete' | 'Current' | 'Valid' | 'Pending'
  date: string
  size: string
}

export default function PartnerPage() {
  const [showBinManagement, setShowBinManagement] = useState(false)
  const [showActivityTracking, setShowActivityTracking] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)

  // Sample bin data
  const binsData: Bin[] = [
    { id: 'BI-7829', location: 'Main Office - Floor 3', status: 'Full', capacity: '85%', lastPickup: '1 week ago', nextPickup: 'Tomorrow' },
    { id: 'BI-7830', location: 'Kitchen Area', status: 'Ready', capacity: '92%', lastPickup: '3 days ago', nextPickup: 'Jan 20' },
    { id: 'BI-7831', location: 'Conference Room A', status: 'Partial', capacity: '45%', lastPickup: '5 days ago', nextPickup: 'Jan 25' },
    { id: 'BI-7832', location: 'Reception Desk', status: 'Partial', capacity: '30%', lastPickup: '1 week ago', nextPickup: 'Jan 22' }
  ]

  // Sample activity data  
  const activityData: Activity[] = [
    { id: 'A-001', type: 'Collection', description: 'Batch BA-8472 Collected - 45 lbs from Main Office', date: '2 days ago', status: 'Completed' },
    { id: 'A-002', type: 'Manufacturing', description: '12 Phone Stands Completed - Made from your Q3 collection', date: '5 days ago', status: 'Completed' },
    { id: 'A-003', type: 'Pickup', description: 'Bin BI-7829 Pickup Scheduled', date: '1 week ago', status: 'Scheduled' },
    { id: 'A-004', type: 'Processing', description: 'Batch BA-8471 Processing Started - 38 lbs material', date: '1 week ago', status: 'In Progress' }
  ]

  // Sample document data
  const documentsData: Document[] = [
    { id: 'D-001', name: 'Partnership Agreement', type: 'Contract', status: 'Active', date: 'Jan 15, 2024', size: '2.4 MB PDF' },
    { id: 'D-002', name: 'Initial Waste Assessment', type: 'Report', status: 'Complete', date: 'Dec 10, 2023', size: '1.8 MB PDF' },
    { id: 'D-003', name: 'Service Level Agreement', type: 'Contract', status: 'Current', date: 'Mar 8, 2024', size: '1.2 MB PDF' },
    { id: 'D-004', name: 'Compliance Certification', type: 'Certificate', status: 'Valid', date: 'Nov 20, 2023', size: '950 KB PDF' },
    { id: 'D-005', name: 'Insurance Certificate', type: 'Certificate', status: 'Pending', date: 'Pending upload', size: '-' }
  ]

  const binColumns: Column<Bin>[] = [
    { key: 'id', header: 'Bin ID' },
    { key: 'location', header: 'Location' },
    {
      key: 'status',
      header: 'Status',
      render: (bin) => (
        <Badge className={
          bin.status === 'Full' ? 'bg-pop-red text-white' :
          bin.status === 'Ready' ? 'bg-pop-green text-white' :
          'bg-orange-500 text-white'
        }>
          {bin.status}
        </Badge>
      )
    },
    { key: 'capacity', header: 'Capacity' },
    { key: 'lastPickup', header: 'Last Pickup' },
    { key: 'nextPickup', header: 'Next Pickup' }
  ]

  const activityColumns: Column<Activity>[] = [
    { key: 'id', header: 'Activity ID' },
    { key: 'type', header: 'Type' },
    { key: 'description', header: 'Description' },
    { key: 'date', header: 'Date' },
    {
      key: 'status',
      header: 'Status',
      render: (activity) => (
        <Badge className={
          activity.status === 'Completed' ? 'bg-pop-green text-white' :
          activity.status === 'Scheduled' ? 'bg-pop-blue text-white' :
          'bg-orange-500 text-white'
        }>
          {activity.status}
        </Badge>
      )
    }
  ]

  const documentColumns: Column<Document>[] = [
    { key: 'id', header: 'Doc ID' },
    { key: 'name', header: 'Document Name' },
    { key: 'type', header: 'Type' },
    {
      key: 'status',
      header: 'Status',
      render: (doc) => (
        <Badge className={
          doc.status === 'Active' || doc.status === 'Current' || doc.status === 'Valid' ? 'bg-pop-green text-white' :
          doc.status === 'Complete' ? 'bg-pop-blue text-white' :
          'bg-gray-400 text-white'
        }>
          {doc.status}
        </Badge>
      )
    },
    { key: 'date', header: 'Date' },
    { key: 'size', header: 'Size' }
  ]

  const renderBinModal = (bin: Bin) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Bin {bin.id}</h3>
      <div className="space-y-3">
        <div><strong>Location:</strong> {bin.location}</div>
        <div><strong>Status:</strong> {bin.status}</div>
        <div><strong>Capacity:</strong> {bin.capacity}</div>
        <div><strong>Last Pickup:</strong> {bin.lastPickup}</div>
        <div><strong>Next Pickup:</strong> {bin.nextPickup}</div>
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-pop-green hover:bg-pop-green/90">Schedule Pickup</Button>
          <Button variant="outline" className="w-full">View History</Button>
          <Button variant="outline" className="w-full">Generate QR Code</Button>
        </div>
      </div>
    </div>
  )

  const renderActivityModal = (activity: Activity) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{activity.type} - {activity.id}</h3>
      <div className="space-y-3">
        <div><strong>Description:</strong> {activity.description}</div>
        <div><strong>Date:</strong> {activity.date}</div>
        <div><strong>Status:</strong> {activity.status}</div>
        <div className="pt-4 space-y-2">
          <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">View Details</Button>
          <Button variant="outline" className="w-full">Track Progress</Button>
        </div>
      </div>
    </div>
  )

  const renderDocumentModal = (doc: Document) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{doc.name}</h3>
      <div className="space-y-3">
        <div><strong>Type:</strong> {doc.type}</div>
        <div><strong>Status:</strong> {doc.status}</div>
        <div><strong>Date:</strong> {doc.date}</div>
        <div><strong>Size:</strong> {doc.size}</div>
        <div className="pt-4 space-y-2">
          {doc.status !== 'Pending' ? (
            <Button className="w-full bg-pop-green hover:bg-pop-green/90">Download</Button>
          ) : (
            <Button className="w-full bg-pop-blue hover:bg-pop-blue/90">Upload</Button>
          )}
          <Button variant="outline" className="w-full">View History</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-pop-black">Partner Dashboard</h2>
        <p className="text-gray-600 mt-2">Your circular economy impact and bin management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Bins</CardTitle>
            <Package className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">3 ready for pickup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plastic Collected</CardTitle>
            <Recycle className="h-4 w-4 text-pop-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847 lbs</div>
            <p className="text-xs text-gray-600">This quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Created</CardTitle>
            <QrCode className="h-4 w-4 text-pop-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-600">From your waste</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-pop-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-gray-600">Circular efficiency</p>
          </CardContent>
        </Card>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="bin-management" className="border rounded-lg px-4">
          <AccordionTrigger 
            className="hover:no-underline"
            onClick={() => setShowBinManagement(!showBinManagement)}
          >
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-pop-green" />
              <div className="text-left">
                <div className="font-semibold">Bin Management</div>
                <div className="text-sm text-gray-600">Track collection points and capacity</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <DataTable 
                data={binsData} 
                columns={binColumns}
                renderModal={renderBinModal}
                searchPlaceholder="Search bins..."
                emptyMessage="No bins found"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="activity-tracking" className="border rounded-lg px-4">
          <AccordionTrigger 
            className="hover:no-underline"
            onClick={() => setShowActivityTracking(!showActivityTracking)}
          >
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-pop-blue" />
              <div className="text-left">
                <div className="font-semibold">Recent Activity</div>
                <div className="text-sm text-gray-600">Latest pickups and transformations</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <DataTable 
                data={activityData} 
                columns={activityColumns}
                renderModal={renderActivityModal}
                searchPlaceholder="Search activities..."
                emptyMessage="No activities found"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="documents" className="border rounded-lg px-4">
          <AccordionTrigger 
            className="hover:no-underline"
            onClick={() => setShowDocuments(!showDocuments)}
          >
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-pop-red" />
              <div className="text-left">
                <div className="font-semibold">Partner Documentation</div>
                <div className="text-sm text-gray-600">Essential documents and agreements</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <DataTable 
                data={documentsData} 
                columns={documentColumns}
                renderModal={renderDocumentModal}
                searchPlaceholder="Search documents..."
                emptyMessage="No documents found"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
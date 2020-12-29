import { ClockCircleOutlined, HourglassOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Drawer, Empty, Progress, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store, { add as addJobs } from '../../../../store';
import '../../../../styles/pages/jobs.scss';
import { messageTgsError } from '../../../../utils/other';
import Tgs from '../../../../utils/tgs';

const JobsDrawer = ({ instanceId, onJobComplete }) => {
  const [{ opened, stoppedJobs }, setData] = useState({ opened: false, stoppedJobs: {} });
  const setOpened = v => setData(prevState => ({ ...prevState, opened: v }));
  const setStoppedJobs = v => setData(prevState => ({ ...prevState, stoppedJobs: v }));
  const instanceJobs = useSelector(state => state.instanceJobs.jobs);

  useEffect(() => {
    Tgs.get("Job", { "Instance": instanceId })
      .then(({ data }) => store.dispatch(addJobs(data)))
      .catch(error => messageTgsError(error, "fetch jobs for instance " + instanceId));
  }, []);

  return (
    <Drawer
      title="Jobs"
      className="lilac-jobs"
      width="300px"
      visible={opened}
      forceRender
      onClose={() => setOpened(false)}>
      {instanceJobs?.length > 0 ? (
        <JobsContent
          instanceId={instanceId}
          jobs={instanceJobs}
          onComplete={onJobComplete}
          onStop={
            jobId => setStoppedJobs({
              ...stoppedJobs,
              [jobId]: true,
            })
          }
        />
      ) : (
        <Empty description={<Typography.Text disabled>No jobs for this instance.</Typography.Text>} />
      )}
      <DrawerHandle
        jobs={instanceJobs.filter(job => !stoppedJobs[job.id])}
        onClick={() => setOpened(!opened)}
      />
    </Drawer>
  );
};
export default JobsDrawer;

const JobsContent = ({ jobs, ...rest }) => {
  return (
    <Spin spinning={!jobs}>
      {jobs?.map(job => (
        <JobCard
          key={job.id}
          job={job}
          {...rest}
        />
      ))}
    </Spin>
  );
};

const JobCard = ({ instanceId, job, onComplete, onStop }) => {
  const [jobData, setJobData] = useState(job);
  const isCompleted = jobData.stoppedAt && !jobData.errorCode;

  useEffect(() => {
    const intervalHandle = setInterval(() => {
      Tgs.get("Job/" + jobData.id, { "Instance": instanceId })
        .then(({ data }) => {
          if (!jobData.stoppedAt && data.stoppedAt) {
            if (!data.errorCode) {
              onComplete(data.id);
            }
            onStop(data.id);
          }
          setJobData(data);
        })
        .catch(error => messageTgsError(error, "fetch job ID " + jobData.id));
    }, 10000);
    return () => clearInterval(intervalHandle);
  }, []);

  return (
    <Card
      type="inner"
      size="small"
      title={"Job #" + jobData.id}
      className="mb-1"
      extra={(
        !jobData.stoppedAt && <Button size="small" danger>Cancel</Button>
      )}>
      {jobData.description}<br />
      <Typography.Text type="secondary">
        <UserOutlined /> {jobData.startedBy?.name} ({jobData.startedBy?.id})<br />
        <ClockCircleOutlined /> {jobData.startedAt && new Date(jobData.startedAt).toLocaleString()}<br />
      </Typography.Text>
      <Progress
        percent={isCompleted ? 100 : (jobData.progress || 0)}
        status={
          jobData.stoppedAt && (
            jobData.errorCode
            ? "exception" 
            : "success"
          )
          || "active"
        }
        showInfo={isCompleted}
      />
    </Card>
  );
};

const DrawerHandle = ({ jobs, onClick }) => {
  return (
    <Badge
      count={jobs?.length}
      offset={[-64, 0]}
      className="lilac-jobs-handle">
      <Button
        type="primary"
        style={{
          width: "64px",
          height: "64px",
          borderTopRightRadius: "0",
          borderBottomRightRadius: "0",
        }}
        onClick={onClick}>
        <HourglassOutlined style={{ fontSize: "24px" }} /><br />
        <span style={{ fontSize: "12px "}}>
          JOBS
        </span>
      </Button>
    </Badge>
  );
};
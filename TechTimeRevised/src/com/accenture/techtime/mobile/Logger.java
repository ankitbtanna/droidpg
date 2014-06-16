package com.accenture.techtime.mobile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.MessageFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import android.content.Context;
import android.os.Environment;
import android.util.Log;

public class Logger {
	private static Logger instance = null;
	private static final int MAX_LOGS = 10;

	public enum Level { DEBUG, INFO, WARN, ERROR }

	private Level level = Level.ERROR;
	private String tag;
	private SimpleDateFormat format = new SimpleDateFormat("MM/dd/yy hh:mm:ss");
	private File log;
	private PrintWriter writer;
	private String supportEmail;

	public void LoggerSetup(String tag, String logFilename, Level level ) {
		Log.i(tag, "*************************************************************");
		Log.i(tag, "*******************Setting Up Logger *************************");
		//close previous
	    if( writer != null ) {
	        writer.flush();
	        writer.close();
	        writer = null;
	    }
	    //open new
	    this.tag = tag;
	    this.log = createWriter( logFilename );
	    this.level = level;
	    Log.i(tag, "*************************************************************");
	}

	private Logger(Context context) {
	    LoggerSetup(context.getPackageName(), "application.log", Level.INFO);
	}

	public static Logger getInstance(Context context) {
	    if(instance == null) {
	        instance = new Logger(context);
	    }
	    return instance;
	}

	private Logger() {
	    LoggerSetup("", "application.log", Level.INFO);
	}

	private File createWriter(String logFilename) {
	    try {
	        String state = Environment.getExternalStorageState();
	        if( state.equals(Environment.MEDIA_MOUNTED) ) {
	            File dir = new File( Environment.getExternalStorageDirectory(), "com.accenture.techtime.mobile");
	            if( !dir.mkdirs() ) {
	                Log.w( tag, "Could not create log directory: " + dir.getAbsolutePath() );
	            }
	            File log = new File(dir, logFilename);
	            if( log.exists() ) {
	                rotate( log );
	            }
	            Log.i( tag, "Opening " + log.getAbsolutePath() );
	            writer = new PrintWriter( new FileWriter( log ), true );
	            return log;
	        } else {
	            Log.w( tag, "Could not create log file because external storage state was " + state);
	        }
	    } catch( IOException ioe ) {
	        Log.e( tag, "Failed while opening the log file.", ioe );
	    }

	    return null;
	}

	private void rotate(File log) {
	    int index = log.getName().lastIndexOf('.');
	    if( index < 0 ) index = log.getName().length();
	    String prefix = log.getName().substring(0, index );
	    String extension = log.getName().substring(index);

	    int lastLog = MAX_LOGS - 1;
	    File lastLogFile = new File( log.getParentFile(), prefix + "-" + lastLog + extension );
	    if( lastLogFile.exists() ) lastLogFile.delete();

	    for( int i = lastLog; i >= 1; --i ) {
	        String filename = prefix + "-" + i + extension;
	        File l = new File( log.getParentFile(), filename );
	        if( l.exists() ) {
	            File newLog = new File( log.getParentFile(), prefix + "-" + (i+1) + extension );
	            l.renameTo( newLog );
	        }
	    }

	    log.renameTo( new File( log.getParentFile(), prefix + "-1" + extension ) );
	}

	public Level getLevel() {
	    return level;
	}

	public void setLevel(Level level) {
	    this.level = level;
	}

	public boolean isLoggable( Level level ) {
	    return level.ordinal() >= this.level.ordinal();
	}

	public void debug( String message, Object... parameters ) {
	    if( parameters.length > 0 ) {
	        Log.d( tag, MessageFormat.format( message, parameters ) );
	    } else {
	        Log.d( tag, message );
	    }
	    log( Level.DEBUG, message, parameters );
	}

	public void info( String message, Object... parameters ) {
	    if( parameters.length > 0 ) {
	    	Log.i(tag, "*************************************************************");
	        Log.i( tag, MessageFormat.format( message, parameters ) );
	        Log.i(tag, "*************************************************************");
	    } else {
	        Log.i( tag, message );
	    }
	    log( Level.INFO, message, parameters );
	}

	public void warn( String message, Object... parameters ) {
	    if( parameters.length > 0 ) {
	        Log.w( tag, MessageFormat.format( message, parameters ) );
	    } else {
	        Log.w( tag, message );
	    }
	    log( Level.WARN, message, parameters );
	}

	public void error( String message, Object... parameters ) {
	    if( parameters.length > 0 ) {
	        Log.e( tag, MessageFormat.format( message, parameters ) );
	    } else {
	        Log.e( tag, message );
	    }
	    log( Level.ERROR, message, parameters );
	}

	public void error(Throwable throwable) {
	    String message = Log.getStackTraceString( throwable );
	    Log.e( tag, message, throwable );
	    log( Level.ERROR, message );
	}

	public void close() {
	    if( writer != null ) {
	        writer.flush();
	        writer.close();
	        writer = null;
	    }
	}

	private void log( Level level, String message, Object... parameters ) {
	    if( writer != null && isLoggable(level) ) {
	        Date date = new Date();
	        writer.print( format.format(date) );
	        writer.print( " " );
	        writer.print( level.toString() );
	        writer.print( " " );
	        writer.print( tag );
	        writer.print( " " );
	        writer.print( Thread.currentThread().getName() );
	        writer.print( " - " );
	        if( parameters.length > 0 ) {
	            writer.println( MessageFormat.format( message, parameters ) );
	        } else {
	            writer.println( message );
	        }
	    }
	}

//	protected void sendEmail(Context context) throws IOException {
//	    File[] logs = log.getParentFile().listFiles( new FileFilter() {
//			
//			@Override
//			public boolean accept(File pathname) {
//				// TODO Auto-generated method stub
//				return pathname.getName().endsWith(".log");
//			}
//		});
//
//	    File temp = zipLogFiles(logs);
//	    String[] mailto = { supportEmail };
//	    Intent sendIntent = new Intent(Intent.ACTION_SEND);
//	    sendIntent.setType("application/zip");
//	    sendIntent.putExtra(Intent.EXTRA_EMAIL, mailto);
//	    sendIntent.putExtra(Intent.EXTRA_SUBJECT, tag + ": Log File Attached");
//	    sendIntent.putExtra(Intent.EXTRA_TEXT, "A user has requested you look at some logs.");
//	    sendIntent.putExtra(Intent.EXTRA_STREAM, Uri.fromFile(temp) );
//	    sendIntent.setType("text/plain");
//	    context.startActivity(Intent.createChooser(sendIntent, "Send Logs To Support"));
//	}

	private File zipLogFiles(File[] logs) throws IOException {
	    File zipfile = File.createTempFile("brewster", ".zip");
	    ZipOutputStream stream = new ZipOutputStream( new FileOutputStream(zipfile) );
	    try {
	        for( File log : logs ) {
	            ZipEntry entry = new ZipEntry( log.getName() );
	            stream.putNextEntry( entry );
	            copy(stream, log );
	            stream.closeEntry();
	        }
	        stream.finish();
	        return zipfile;
	    } finally {
	        stream.close();
	    }
	}

	private void copy(OutputStream stream, File file) throws IOException {
	    InputStream istream = new FileInputStream( file );
	    try {
	        byte[] buffer = new byte[8096];
	        int length = 0;
	        while( (length = istream.read( buffer )) >= 0 ) {
	            stream.write( buffer, 0, length );
	        }
	    } finally {
	        istream.close();
	    }
	}
}